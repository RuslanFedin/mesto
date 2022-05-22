export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open(){
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape'){
      const popupOpened = document.querySelector('.popup_opened');
      this.close(popupOpened);
    }
  }

  setEventListeners(){
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        this.close(this.popupOpened);
      };
    });
  }
}


