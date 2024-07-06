// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
// @todo: DOM узлы
const container = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard (cardTemplate, container, element) {
        const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true); 
        cardElement.querySelector('.card__image').setAttribute('src', element.link);
        cardElement.querySelector('.card__image').setAttribute('alt', element.name);
        cardElement.querySelector('.card__title').textContent = element.name;
        
        const resetButton = cardElement.querySelector('.card__delete-button');

        resetButton.addEventListener('click', function(){
            delCard(cardElement);
        })
        container.append(cardElement);
}
// @todo: Функция удаления карточки

function delCard (cardElement) {
    cardElement.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(element => {
    addCard(cardTemplate, container, element);
});
