import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach ((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  toogleButtonText(state) {
    if (state) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }
}
