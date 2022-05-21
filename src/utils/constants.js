export const cardsInitial = [ //При загрузке страницы JS добавляет 6 фотокарточек //Это массив карточек
  {
    nameplace: 'Михалыч',
    link: 'https://images.unsplash.com/photo-1568051131683-700fd7420b5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpdHR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    nameplace: 'Егор Алексеевич',
    link: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    nameplace: 'Пётр',
    link: 'https://images.unsplash.com/photo-1555595925-69049e7b7682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    nameplace: 'Станислав',
    link: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    nameplace: 'Аркадий',
    link: 'https://images.unsplash.com/photo-1638947693941-669835e07b4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    nameplace: 'Жора',
    link: 'https://images.unsplash.com/photo-1611145949721-e5158cddf59f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
];
export const userData = {
  name: '.profile__name',
  profession: '.profile__profession'
}

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const formElement = document.querySelector('.popup__container');
export const popupEditProfile = document.querySelector('.popup_type_profile-edit');
export const editProfileForm = popupEditProfile.querySelector('.popup__form_profile-edit');
export const nameInput = formElement.querySelector('.popup__input_name');
export const professionInput = formElement.querySelector('.popup__input_profession');
export const buttonAddPlace = document.querySelector('.profile__add-button');
export const popupAddPlace = document.querySelector('.popup_type_place-add');
export const imagePopup = document.querySelector('.popup_type_image-full');
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
  errorClass: 'popup__error_visible'
};
