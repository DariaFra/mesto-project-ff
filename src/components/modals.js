
export const openModal = (popup) => {      
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', closeEsc);
    popup.addEventListener('click', closePopup);
}

export const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
    popup.removeEventListener('click', closePopup);
}

export const initClosePopups = () => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.addEventListener('click', closePopup)
    });
}

function closeEsc(evt) {
    if (evt.key === 'Escape') {
        const popupIsOpen = document.querySelector('.popup_is-opened');
        closeModal(popupIsOpen);
    }
}

const closePopup = evt => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) { 
         closeModal(evt.currentTarget); 
    } 
 }
