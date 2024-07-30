// @todo: Функция создания карточки

export function createCard (cardTemplate, element, handleLike, openCard, delCard) {
    const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true); 
    cardElement.querySelector('.card__image').setAttribute('src', element.link);
    cardElement.querySelector('.card__image').setAttribute('alt', element.name);
    cardElement.querySelector('.card__title').textContent = element.name;
   
    const resetButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption'); 

    popupImage.scr = element.link;
    popupImage.alt = element.name;
    popupCaption.textContent = element.name;

    cardLikeButton.addEventListener('click', function() {
        handleLike(cardLikeButton);
    });

    cardImage.addEventListener('click', function() {
        openCard(element.link, element.name);
    });

    resetButton.addEventListener('click', function() {
        delCard(cardElement);
    });

    return cardElement; 
}  

// Функция лайка карточки
export function handleLike (button) {
    button.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function delCard (cardElement) {
    cardElement.remove();
}