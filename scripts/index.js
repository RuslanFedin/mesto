const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const popupEditProfile = document.querySelector('.popup_edit-profile');
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
const template = document.querySelector('#element-template').content;
const imagePopup = document.querySelector('.popup_image-place'); // Popup картинки
const imageFull = imagePopup.querySelector('.popup__image-full');
const imageTittle = imagePopup.querySelector('.popup__image-tittle');
const buttonImageClose = imagePopup.querySelector('.popup__close-button');
const buttonElementEditProfile = document.querySelector('.popup__save-button_edit-profile');
const buttonElementAddPlace = document.querySelector('.popup__save-button_add-place')
const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// сосдаем массив попапов
const popupList = Array.from(document.querySelectorAll('.popup'));

// закрываем попап по оверлею и по кнопке закрытия
popupList.forEach( (popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')){
      closePopup(popup);
    };
  });
});

// редактирование профиля
buttonEditProfile.addEventListener('click', () => { //Вещаю слушатель на кнопку редактирования профиля и присваиваю функцию открытия popup редактирования профиля.
  nameInput.value = name.textContent;
  professionInput.value = profession.textContent;
  enableButton(buttonElementEditProfile, validationConfig);
  openPopup(popupEditProfile);
});

function handleSubmitForm (evt) { // Отправляем форму и вставляем содержимое на страницу
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleSubmitForm); // Обработчик событий в форме попапа: он будет следить за событием “submit” - «отправка»

// добавление публикации
buttonAddPlace.addEventListener('click', () => { // Вешаю слушатель на кнопку добавления публтикации  и присваиваю функцию открытия popup.
  disableButton(buttonElementAddPlace, validationConfig);
  openPopup(popupAddPlace);
})

const createPhotos = (photoCard) => { // Функция которая генерирует HTML элемент. Затем будем добавлять его в массив галлереи в начало массива.
  const elementItem = template.querySelector('.element-item').cloneNode(true);
  const buttonLike = elementItem.querySelector('.element-item__like');
  const elementImage= elementItem.querySelector('.element-item__image');
  elementImage.src = photoCard.link;
  elementImage.alt = photoCard.name;
  elementItem.querySelector('.element-item__title').textContent = photoCard.name;
  elementItem.querySelector('.element-item__remove').addEventListener('click', () => { // Удаление публикации
    elementItem.remove();
  });

  buttonLike.addEventListener('click', () => { // Реализация лайка
    event.target.classList.toggle('element-item__like_active');
  });

  elementImage.addEventListener('click', () => { // ПРОСМОТР КАРТИНКИ. Вешаю слушатель на картинку и присваиваю функцию открытия popup
    imageFull.src = photoCard.link;
    imageFull.alt = photoCard.name;
    imageTittle.textContent = photoCard.name;
    openPopup(imagePopup);
  });

  return elementItem;
}

const renderPlace = (photoCard) => { //Вставляем новые карточки перед старыми
  elementsPhotoContainer.prepend(createPhotos(photoCard));
}

const addPlace = (event) => { //Функция добавления публикации
  event.preventDefault(); //Запрещаем выполнение события по умолчанию, чтобы при отправе страница не перезагружалась
  const photoCard = { }; // Создаем объект
  photoCard.name = placeNameInput.value; // Присваиваем для name объекта значение из инпута name;
  photoCard.link = placeLinkInput.value; // Присваиваем для link объеата значение из инпута link.
  renderPlace(photoCard);
  closePopup(popupAddPlace); // Закрываем Popup
  placeNameInput.value = ''; // Сбрасываем введенные значения
  placeLinkInput.value = ''; // Сбрасываем введенные значения
}

const placeCard = cardsInitial.map(photoCard =>{ // Проходимся по массиву карточек и выводим результат в новый отдельный массив.
  return createPhotos(photoCard);
});

elementsPhotoContainer.append(...placeCard);
placeFormAdd.addEventListener('submit', addPlace); //Вешаем обработчик события на форму добавления новой карточки. При нажатии на Создать, выполнятся функция addPlace

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












