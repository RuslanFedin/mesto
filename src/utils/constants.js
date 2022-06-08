
export const userData = {
  name: '.profile__name',
  about: '.profile__profession',
  avatar: '.profile__avatar',
}
export const idConfig = {
  elementTemplate: '#element-template',
};
// export const elementTemplate = document.querySelector('#element-template');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const formElement = document.querySelector('.popup__container');
export const popupEditProfile = document.querySelector('.popup_type_profile-edit');
export const editProfileForm = popupEditProfile.querySelector('.popup__form_profile-edit');
export const nameInput = formElement.querySelector('.popup__input_name');
export const professionInput = formElement.querySelector('.popup__input_profession');
export const buttonAddPlace = document.querySelector('.profile__add-button');
export const popupAddPlace = document.querySelector('.popup_type_place-add');
export const imagePopup = document.querySelector('.popup_type_image-full');
export const popupDeleteImage = document.querySelector('.popup_type_image-delete');
export const imageFull = imagePopup.querySelector('.popup__image-full');
export const imageTittle = imagePopup.querySelector('.popup__image-tittle');
export const container = document.querySelector('.elements__photo-grid'); // берем всю галлерею (там массив)
export const placeFormAdd = popupAddPlace.querySelector('.popup__form_place-add'); // Добавляем елемент формы
export const placeNameInput = placeFormAdd.querySelector('.popup__input_place-tittle'); // Добавляем input названия места
export const placeLinkInput = placeFormAdd.querySelector('.popup__input_place-photo'); // Добавляем input фотографии места
export const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

