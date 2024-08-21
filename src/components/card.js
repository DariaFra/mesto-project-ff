// @todo: Функция создания карточки

import { openModal } from "./modals";
import { putLike, deleteLike } from "./api"

export function createCard (element, handleLike, deleteMyCard, openCard, userId) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikesCounter = cardElement.querySelector('.card__like-counter')
    const cardId = element._id;
    cardTitle.textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardLikesCounter.textContent = element.likes.length;

    if (element.likes.some((like) => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }

    if(element.owner._id !== userId) {
        deleteButton.classList.add('card__delete-button-hidden');
    } else {
        deleteButton.addEventListener('click', () => handleDelete(cardId, cardElement, deleteMyCard))
    }

    cardLikeButton.addEventListener('click', function() {
        handleLike(cardLikeButton, cardId, cardLikesCounter);
    });

    cardImage.addEventListener('click', function() {
        openCard(element);
    });

    return cardElement;
}

// Обработчик лайка карточки
export function handleLike (cardLikeButton, cardId, cardLikesCounter) {
    const likes = cardLikeButton.classList.contains('card__like-button_is-active') ? deleteLike : putLike;
    likes(cardId)
    .then((res) => {
        cardLikeButton.classList.toggle('card__like-button_is-active'); 
        cardLikesCounter.textContent = res.likes.length;
    })
    .catch((err) => {
        console.log(err)
    })    
}

//Обработчик удаления карточки
function handleDelete (cardId, cardElement, deleteMyCard) {
    const popupDelete = document.querySelector('.popup__type_delete');
    const formDelete = document.forms['delete-card'];
    formDelete.onsubmit = (evt) => {
        evt.preventDefault();
        evt.submitter.textContent = 'Удаление...'
         deleteMyCard(cardId, cardElement, evt)
        }
    openModal(popupDelete);   
}
