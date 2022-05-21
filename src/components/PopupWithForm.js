import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  // Собираем данные всех полей формы
  _getInputValues() {
    // Создаем пустой объект
    this._inputValues = {};

    // Добавляем в созданный выше объект значения всех полей
    this._inputList.forEach ((input) => {
      this._inputValues[input.name] = input.value;
    });

    // Возвращаем объект
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
}



