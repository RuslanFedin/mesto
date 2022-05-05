class FormValidator {
  constructor(validationConfig, targetForm) {
    this._form = targetForm;
    this._input = validationConfig.inputSelector;
    this._submitButton = validationConfig.submitButtonSelector;
    this._inactiveButton = validationConfig.inactiveButtonClass;
    this._inputError = validationConfig.inputErrorClass;
    this._errorText = validationConfig.errorClass;

    this._buttonElement = this._form.querySelector(this._submitButton);
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
  }

  _setEventListeners() {

  }

  _enableButton = () => {
    this._buttonSubmit.disabled = false;
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
  }

  _disableButton = () => {
    this._buttonSubmit.disabled = true;
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
  }

  enableValidation = () => {
    this._setEventListeners();
  };

}



export { FormValidator };
