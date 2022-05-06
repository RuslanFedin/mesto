import { cardsInitial, Card } from './card.js';
import { validationConfig, FormValidator } from './FormValidator.js';

const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const editProfileForm = popupEditProfile.querySelector('.popup__edit-user-form');
const nameInput = formElement.querySelector('.popup__name');
const professionInput = formElement.querySelector('.popup__profession');
const buttonAddPlace = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_add-place');
const elementsPhotoContainer = document.querySelector('.elements__photo-grid'); // берем всю галлерею ( там массив)
const placeFormAdd = popupAddPlace.querySelector('.popup__add-place-form'); // Добавляем елемент формы
const placeNameInput = placeFormAdd.querySelector('.popup__place-tittle'); // Добавляем input названия места
const placeLinkInput = placeFormAdd.querySelector('.popup__place-photo'); // Добавляем input фотографии места


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
  placeNameInput.value = "";
  placeLinkInput.value = "";
}

// Добавляем новую карточку в DOM
const addCard = (item) => {
  elementsPhotoContainer.prepend(createCard(item));
};

// Добавим карточки из предсозданного массива cardsInitial в DOM
cardsInitial.forEach((item) => {
  elementsPhotoContainer.append(createCard(item));
});

// Открываем popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// Закрываем popup
function closePopup(popup) { //Общая функция закрытия popup с аргументом на входе popup
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

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

// Закрываем popup по нажатию escape
function closePopupByEsc(evt) { //Закрытие Popup кнопкой Escape
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}

// Валидация формы редактирования профиля
const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
// Валидация формы добавления карточки
const addCardValidation = new FormValidator(validationConfig, placeFormAdd);

// Сохраняем изменения профиля
function handleEditProfileForm(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  closePopup(popupEditProfile);
}

// Вещаем обработчик события на кнопку редактирования профиля
buttonEditProfile.addEventListener('cliсk', () => {
  nameInput.value = name.textContent;
  professionInput.value = profession.textContent;
  editProfileValidation.toggleButtonState();
  openPopup(popupEditProfile);
});
// Вешаем обработчик события на форму редактирования профиля.
editProfileForm.addEventListener('submit', handleEditProfileForm);

// Вешаем обработчик события на кнопку добавления карточки
buttonAddPlace.addEventListener('click', () => {
  addCardValidation.toggleButtonState();
  openPopup(popupAddPlace);
})
// Вешаем обработчик события на форму добавления новой карточки.
placeFormAdd.addEventListener('submit', publishCard);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

export { openPopup };









