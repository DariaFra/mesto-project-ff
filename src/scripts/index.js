import '../pages/index.css';
import {createCard, handleLike} from '../components/card.js'
import {openModal, closeModal} from '../components/modals.js'
import {enableValidation, clearValidation} from '../components/validation.js'
import { addNewCard, editUser, getInitialCard, getUserData, updateAvatar, deleteCard } from '../components/api.js';


// const cardTemplate = document.querySelector('#card-template');
const container = document.querySelector('.places__list');
const buttonEditprofile = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupModalImage = document.querySelector('.popup_type_image');
const formProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption'); 
//переменные для смены аватара
const avatarImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['avatar-profile'];
const avatarInput = document.querySelector('.popup__input_type_avatar');
//переменные для удаления карточки
const popupDelete = document.querySelector('.popup__type_delete');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 
let userId = '';

// Функция добавления новой карточки
function handleNewPlaceSubmit(container, createCard) {
    formNewPlace.addEventListener('submit', function(evt) {
        evt.preventDefault(); 
        evt.submitter.textContent = 'Сохранение...'
        const card = {name: cardNameInput.value, link: urlInput.value}
        addNewCard (card) 
        .then((element) => {
            const newCard = createCard(
                element, 
                handleLike, 
                deleteMyCard,
                openCard, 
                userId
        );
        container.prepend(newCard);
        formNewPlace.reset();
        closeModal(popupNewCard);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить'
        })
    })
}

// Функция удаления карточки
 export function deleteMyCard(cardId, cardElement, evt) {   
        deleteCard(cardId)
        .then(() => { 
        cardElement.remove()
        closeModal(popupDelete)
        })
        .catch((err) => {
        console.log(err)
        })
        .finally(() => {
            evt.submitter.textContent = 'Да'
        })
}

// Функция открытия картинки карточки
export function openCard (card) {
    openModal(popupModalImage);
    popupCaption.textContent = card.name;
    popupImage.src = card.link;
    popupImage.alt = card.name;
}

 // редактирование информации о себе
formProfile.addEventListener('submit', function(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    editUser({name: nameInput.value, about: jobInput.value})
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(popupEdit);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        evt.submitter.textContent = 'Сохранить'
    })
})  

//редактирование аатара
formAvatar.addEventListener('submit', function(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    updateAvatar(avatarInput.value)
    .then((data) => {
        avatarImage.style.backgroundImage = `url(${data.avatar})`
        closeModal(popupAvatar);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        evt.submitter.textContent = 'Сохранить'
    })
})

// открытие модальных окон
buttonEditprofile.addEventListener('click', function(){
    openModal(popupEdit);
    clearValidation(formProfile, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
})  

buttonAddNewCard.addEventListener('click', function(){
    openModal(popupNewCard);
    clearValidation(formNewPlace, validationConfig);
}) 

avatarImage.addEventListener('click', function(){
    openModal(popupAvatar);
    clearValidation(formAvatar, validationConfig);
})

handleNewPlaceSubmit(container, createCard, deleteMyCard);

enableValidation(validationConfig);
    
Promise.all([getInitialCard(), getUserData()])
    .then(([initialCards, userData]) => {
        userId = userData._id
        profileTitle.textContent = userData.name
        profileDescription.textContent = userData.about;
        avatarImage.style.backgroundImage = `url(${userData.avatar})`;
        
        initialCards.forEach((element) => {
            const cardElement = createCard(
                element, 
                handleLike, 
                deleteMyCard, 
                openCard, 
                 userId
            )
            container.append(cardElement);
        })
    })
    .catch((err) => {
        console.log(err)
    })