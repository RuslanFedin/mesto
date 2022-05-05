import { cardsInitial, Card } from './card.js';
import { validationConfig, FormValidator } from './FormValidator.js';

const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const editProfileForm = popupEditProfile.querySelector('.popup__edit-user-form');
const buttonEditProfileClose = popupEditProfile.querySelector('.popup__close-button');
const nameInput = formElement.querySelector('.popup__name');
const professionInput = formElement.querySelector('.popup__profession');
const buttonAddPlace = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_add-place');
const buttonCloseAddPlace = popupAddPlace.querySelector('.popup__close-button');
const elementsPhotoContainer = document.querySelector('.elements__photo-grid'); // берем всю галлерею ( там массив)
const placeFormAdd = popupAddPlace.querySelector('.popup__add-place-form'); // Добавляем елемент формы
const placeNameInput = placeFormAdd.querySelector('.popup__place-tittle'); // Добавляем input названия места
const placeLinkInput = placeFormAdd.querySelector('.popup__place-photo'); // Добавляем input фотографии места
// const template = document.querySelector('#element-template').content;
// const imagePopup = document.querySelector('.popup_image-place'); // Popup картинки
// const imageFull = imagePopup.querySelector('.popup__image-full');
// const imageTittle = imagePopup.querySelector('.popup__image-tittle');
const buttonImageClose = document.querySelector('.popup__close-button');
const buttonElementEditProfile = document.querySelector('.popup__save-button_edit-profile');
const buttonElementAddPlace = document.querySelector('.popup__save-button_add-place')

// Функия создания карточки
function createCard(item) {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция публикации карточки
const publishCard = (evt) => {
  evt.preventDefault();
  const item = {};
  item.name = placeNameInput.value;
  item.link = placeLinkInput.value;
  addCard(item);
  closePopup(popupAddPlace);
  item.name = "";
  item.link = "";
}

// Добавляем новую карточку в DOM
const addCard = (item) => {
  elementsPhotoContainer.prepend(createCard(item));
};

// Добавим карточки из предсозданного массива cardsInitial в DOM
cardsInitial.forEach((item) => {
  elementsPhotoContainer.append(createCard(item));
});


// Создаем массив попапов
const popupList = Array.from(document.querySelectorAll('.popup'));

// Закрываем попап по оверлею и по кнопке закрытия
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    };
  });
});


// Редактируем профиль
function editProfile() {
  nameInput.value = name.textContent;
  professionInput.value = profession.textContent;

  editProfileValidation.toggleButtonState();
  openPopup(popupEditProfile);
}

// Сохраняем изменения профиля
function handleEditProfileForm(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  closePopup(popupEditProfile);
}

function openPopup(popup) { // Общая функция открытия popup с аргументом на входе popup
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) { //Общая функция закрытия popup с аргументом на входе popup
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) { //Закрытие Popup кнопкой Escape
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}


const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
const addCardValidation = new FormValidator(validationConfig, placeFormAdd);

// Вещаем обработчик события на кнопку редактирования профиля
buttonEditProfile.addEventListener('cliсk', () => {
  editProfile();
});
// Вешаем обработчик события на форму редактирования профиля.
editProfileForm.addEventListener('submit', handleEditProfileForm);
// Вешаем обработчик события на кнопку добавления карточки
buttonAddPlace.addEventListener('click', () => {
  placeFormAdd.reset();
  addCardValidation.toggleButtonState();
  openPopup(popupAddPlace);
})
// Вешаем обработчик события на форму добавления новой карточки.
placeFormAdd.addEventListener('submit', publishCard);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

export { openPopup };









