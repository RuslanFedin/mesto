
export const userData = {
  name: '.profile__name',
  about: '.profile__profession',
  avatar: '.profile__avatar',
}
export const idConfig = {
  elementTemplate: '#element-template',
};
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const formElement = document.querySelector('.popup__container');
export const popupEditProfile = document.querySelector('.popup_type_profile-edit');
export const editProfileForm = popupEditProfile.querySelector('.popup__form_profile-edit');
export const nameInput = formElement.querySelector('.popup__input_name');
export const professionInput = formElement.querySelector('.popup__input_profession');
export const buttonAddPlace = document.querySelector('.profile__add-button');
export const popupAddPlace = document.querySelector('.popup_type_place-add');
export const placeFormAdd = popupAddPlace.querySelector('.popup__form_place-add');
export const placeNameInput = placeFormAdd.querySelector('.popup__input_place-tittle');
export const placeLinkInput = placeFormAdd.querySelector('.popup__input_place-photo');
export const imagePopup = document.querySelector('.popup_type_image-full');
export const imageFull = imagePopup.querySelector('.popup__image-full');
export const imageTittle = imagePopup.querySelector('.popup__image-tittle');
export const popupDeleteImage = document.querySelector('.popup_type_image-delete');
export const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
export const avatarChangeForm = popupChangeAvatar.querySelector('.popup__form_change-avatar');
export const avatarLinkInput = popupChangeAvatar.querySelector('.popup__input_avatar');
export const buttonChangeAvatar = document.querySelector('.profile__change-avatar-button');
export const container = document.querySelector('.elements__photo-grid');

export const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

