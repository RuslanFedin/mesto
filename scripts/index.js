import { cardsInitial } from './cardsInitial.js';
import { Card } from './Card.js';
import { validationConfig, FormValidator } from './FormValidator.js';

const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const editProfileForm = popupEditProfile.querySelector('.popup__form_profile-edit');
const nameInput = formElement.querySelector('.popup__input_name');
const professionInput = formElement.querySelector('.popup__input_profession');
const buttonAddPlace = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_type_place-add');
const imagePopup = document.querySelector('.popup_type_image-full');
const imageFull = imagePopup.querySelector('.popup__image-full');
const imageTittle = imagePopup.querySelector('.popup__image-tittle');
const container = document.querySelector('.elements__photo-grid'); // берем всю галлерею ( там массив)
const placeFormAdd = popupAddPlace.querySelector('.popup__form_place-add'); // Добавляем елемент формы
const placeNameInput = placeFormAdd.querySelector('.popup__input_place-tittle'); // Добавляем input названия места
const placeLinkInput = placeFormAdd.querySelector('.popup__input_place-photo'); // Добавляем input фотографии места

// Создаем массив попапов
const popupList = Array.from(document.querySelectorAll('.popup'));
// Валидация формы редактирования профиля
const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
// Валидация формы добавления карточки
const addCardValidation = new FormValidator(validationConfig, placeFormAdd);


// Функия создания карточки
function createCard(item) {
  const card = new Card(item, '#element-template');
  return card.generateCard();
}

// Функция публикации карточки
const publishCard = (evt) => {
  evt.preventDefault();
  const item = {};
  item.name = placeNameInput.value;
  item.link = placeLinkInput.value;
  // addCard(item);
  addNewCard (item, container);
  closePopup(popupAddPlace);
  placeFormAdd.reset();
}

// Добавляем новую карточку в DOM. Используем тернарный оператор
// const addCard = (item) => {
//   elementsPhotoContainer.prepend(createCard(item));
// };
function addNewCard (item, container, toBegining = true) {
  toBegining ? container.prepend(createCard(item)) : container.append(createCard(item));
}

// Добавим карточки из предсозданного массива cardsInitial в DOM
cardsInitial.forEach((item) => {
  // elementsPhotoContainer.append(createCard(item));
  addNewCard (item, container, false);
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

// Вещаем обработчик события на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', editProfile);
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

export { openPopup, imagePopup, imageFull, imageTittle };









