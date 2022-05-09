const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._input = config.inputSelector;
    this._submitButton = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputError = config.inputErrorClass;
    this._errorText = config.errorClass;

    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
  }


  // Устанавливаем слушатели событий
  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  // Изменяем состояние кнопки на активное
  _enableButton = () => {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButton);
  }

  // Изменяем состояние кнопки на не активное
  _disableButton = () => {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButton);
  }

  // Переключаем состояния кнопки в зависимости от валидности формы
  toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  // Проверяем форму на валидность
  _hasInvalidInput = () => {
    return this._inputList.some((_input) => {
      return !_input.validity.valid;
    });
  };

  // Переключаем отображение ошибки в зависимости от валидности формы
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Показываем текст ошибки
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorText);
  };

  // Скрываем текст ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._errorText);
    errorElement.textContent = '';
  };

  // Включаем валидацию формы
  enableValidation = () => {
    this._setEventListeners();
  };

}

export { validationConfig, FormValidator };
