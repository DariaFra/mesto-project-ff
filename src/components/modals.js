
export const openModal = (evt) => {
    evt.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', closeEsc)
}

export const closeModal = (evt) => {
    evt.classList.remove('popup_is-opened');
    document.addEventListener('keydown', closeEsc)
}

export const closePopup = () => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.addEventListener('click', closeOverlay(popup))
    })
}

function closeEsc(evt) {
    if (evt.key === 'Escape') {
        const popupIsOpen = document.querySelector('.popup_is-opened')
        closeModal(popupIsOpen);
    }
}

function closeOverlay(popup) {
    return function (event) {
      if (event.target === popup || event.target.matches('.popup__close')) {
        closeModal(popup);
      }
    };
  }
