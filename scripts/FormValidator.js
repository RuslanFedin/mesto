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
      inputElement.addEventListener('input', function() {
        this._checkInputValidity();
        this.toggleButtonState();
      });
    });
  }

  // Изменяем состояние кнопки на активное
  _enableButton = () => {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  // Изменяем состояние кнопки на не активное
  _disableButton = () => {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  // Переключаем состояния кнопки в зависимости от валидности формы
  toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(this._buttonElement);
    } else {
      this._enableButton(this._buttonElement);
    }
  };

  // Проверяем форму на валидность
  _hasInvalidInput = () => {
    return this._inputList.some((inputList) => {
      return !inputList.validity.valid;
    });
  };

  // Переключаем отображение ошибки в зависимости от валидности формы
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      _showInputError(inputElement, inputElement.validationMessage);
    } else {
      _hideInputError(inputElement);
    }
  };

  // Показываем текст ошибки
  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorText);
  };

  // Скрываем текст ошибки
  _hideInputError = (inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
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
