
export const openModal = (popup) => {      
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', closeEsc);
    popup.addEventListener('click', closePopupByClick);
}

export const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
    popup.removeEventListener('click', closePopupByClick);
}

function closeEsc(evt) {
    if (evt.key === 'Escape') {
        const popupIsOpen = document.querySelector('.popup_is-opened');
        closeModal(popupIsOpen);
    }
}

const closePopupByClick = evt => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) { 
         closeModal(evt.currentTarget); 
    } 
 }
