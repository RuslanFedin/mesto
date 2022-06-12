import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(data) {
    this._data = data;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._data);
    });
    super.setEventListeners();
  }
}
