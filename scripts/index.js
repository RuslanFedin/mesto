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
const cardsInitial = [ //При загрузке страницы JS добавляет 6 фотокарточек //Это массив карточек
  {
    name: 'Михалыч',
    link: 'https://images.unsplash.com/photo-1568051131683-700fd7420b5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpdHR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Егор Алексеевич',
    link: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Пётр',
    link: 'https://images.unsplash.com/photo-1555595925-69049e7b7682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Станислав',
    link: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Аркадий',
    link: 'https://images.unsplash.com/photo-1638947693941-669835e07b4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Жора',
    link: 'https://images.unsplash.com/photo-1611145949721-e5158cddf59f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
];

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

buttonEditProfile.addEventListener('click', () => { //Вещаю слушатель на кнопку редактирования профиля и присваиваю функцию открытия popup редактирования профиля.
  nameInput.value = name.textContent;
  professionInput.value = profession.textContent;
  openPopup(popupEditProfile);
});

function handleSubmitForm (evt) { // Отправляем форму и вставляем содержимое на страницу
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  closePopup(popupEditProfile);
}

buttonEditProfileClose.addEventListener('click', () => { //Вешаю слушатель на кнопку закрытия popup и присваиваю функцию закрытия popup редактирования профиля
  closePopup(popupEditProfile);
});

formElement.addEventListener('submit', handleSubmitForm); // Обработчик событий в форме попапа: он будет следить за событием “submit” - «отправка»

// ДОБАВЛЕНИЕ ПУБЛИКАЦИИ

buttonAddPlace.addEventListener('click', () => { // Вешаю слушатель на кнопку добавления публтикации  и присваиваю функцию открытия popup.
  openPopup(popupAddPlace);
})

buttonCloseAddPlace.addEventListener('click', () => { // Вешаю слушатель на кнопку закрытия popup добавления публикации и присваиваю функцию закрытия popup.
  closePopup(popupAddPlace);
})

const createPhotos = (photoCard) => { // Функция которая генерирует HTML элемент. Затем будем добавлять его в массив галлереи в начало массива.
  const template = document.querySelector('#element-template').content;
  const elementItem = template.querySelector('.element-item').cloneNode(true);
  const imagePopup = document.querySelector('.popup_image-place'); // Popup картинки
  const imageFull = imagePopup.querySelector('.popup__image-full');
  const imageTittle = imagePopup.querySelector('.popup__image-tittle');
  const buttonImageClose = imagePopup.querySelector('.popup__close-button');
  const imageToFull = elementItem.querySelector('.element-item__image'); // Задаем переменную и вещаем слушатель. При клике на нее, должен открываться попап.
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

  imageToFull.addEventListener('click', () => { // ПРОСМОТР КАРТИНКИ. Вешаю слушатель на картинку и присваиваю функцию открытия popup
    imageFull.src = photoCard.link;
    imageFull.alt = photoCard.name;
    imageTittle.textContent = photoCard.name;
    openPopup(imagePopup);
  });

  buttonImageClose.addEventListener('click', () => { // Вешаем слушатель на закрытие картинки и присваиваем функцию закрытия popup
    closePopup(imagePopup);
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
}

function closePopup(popup) { //Общая функция закрытия popup с аргументом на входе popup
  popup.classList.remove('popup_opened');
}








