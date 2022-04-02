// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

let name = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');
const editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__container');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const closeButtonEditProfile = popupEditProfile.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__name');
let professionInput = formElement.querySelector('.popup__profession');

function openPopupEditProfile () { // Открываем popup
  popupEditProfile.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
  nameInput.value = name.textContent;
  professionInput.value = profession.textContent;
}

function formSubmitHandler (evt) { // Отправляем форму и вставляем содержимое на страницу
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = professionInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopupEditProfile);
closeButtonEditProfile.addEventListener('click', closePopup); //Закрываем Popup
formElement.addEventListener('submit', formSubmitHandler); // Обработчик событий в форме попапа: он будет следить за событием “submit” - «отправка»

// ДОБАВЛЕНИЕ НОВОЙ ПУБЛИКАЦИИ

const addButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup__add-place');
const closeButtonAddPlace = popupAddPlace.querySelector('.popup__close-button');

function openPopupAddPlace () { // Открываем popup
  popupAddPlace.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}
addButton.addEventListener('click', openPopupAddPlace);
closeButtonAddPlace.addEventListener('click', closePopup); //Закрываем Popup

const initialCards = [ //При загрузке страницы JS добавляет 6 фотокарточек //Это массив карточек
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

const elementsPhotoContainer = document.querySelector('.elements__photo-grid'); // берем всю галлерею ( там массив)
const addPlaceForm = popupAddPlace.querySelector('.popup__add-place-form'); // Добавляем елемент формы
let namePlaceInput = addPlaceForm.querySelector('.popup__place-tittle'); // Добавляем input названия места
let linkPlaceInput = addPlaceForm.querySelector('.popup__place-photo'); // Добавляем input фотографии места


const createPhotos = (photoCard) => { // Функция которая генерирует HTML элемент. Затем будем добавлять его в массив галлереи в начало массива.
  const template = document.querySelector('#element-template').content;
  const elementItem = template.querySelector('.element-item').cloneNode(true);
  elementItem.querySelector('.element-item__image').src = photoCard.link;
  elementItem.querySelector('.element-item__image').alt = photoCard.name;
  elementItem.querySelector('.element-item__title').textContent = photoCard.name;
  elementItem.querySelector('.element-item__remove').addEventListener('click', () => { // Удаление публикации
    elementItem.remove();
  });
  const likeButton = elementItem.querySelector('.element-item__like'); // Реализация лайка
  likeButton.onclick = (event) => {
    event.target.classList.toggle('element-item__like_active');
  }
  const imageToFull = elementItem.querySelector('.element-item__image'); // Задаем переменную и вещаем слушатель. При клике на нее, должен открываться попап.
  imageToFull.addEventListener('click', () => {
    openPopupImage(photoCard);
  });

  return elementItem;
}

const imagePopup = document.querySelector('.popup__image-place'); // Popup картинки
const imageCloseButton = imagePopup.querySelector('.popup__close-button');
function openPopupImage (photoCard) {  //Открываем попап с картинкой
  imagePopup.classList.add ('popup_opened');
  imagePopup.querySelector('.popup__image-full').src = photoCard.link;
  imagePopup.querySelector('.popup__image-full').alt = photoCard.name;
  imagePopup.querySelector('.popup__image-tittle').textContent = photoCard.name;
  document.addEventListener('keyup', onDocumentKeyUp);
}
imageCloseButton.addEventListener('click', closePopup); // Закрываем попап

const renderPlace = (photoCard) => {
  elementsPhotoContainer.prepend(createPhotos(photoCard));
}

const addPlace = (event) => { //Функция добавления публикации
  event.preventDefault(); //Запрещаем выполнение события по умолчанию, чтобы при отправе страница не перезагружалась
  const photoCard = { }; // Создаем объект
  photoCard.name = namePlaceInput.value; // Присваиваем для name объекта значение из инпута name;
  photoCard.link = linkPlaceInput.value; // Присваиваем для link объеата значение из инпута link.
  renderPlace(photoCard);
  namePlaceInput.value = '';
  linkPlaceInput.value = '';
  closePopup();
}

const placeCard = initialCards.map(photoCard =>{ // Проходимся по массиву карточек и выводим результат в новый отдельный массив.
  return createPhotos(photoCard);
});

elementsPhotoContainer.append(...placeCard);
addPlaceForm.addEventListener('submit', addPlace); //Вешаем обработчик события на форму добавления новой карточки. При нажатии на Создать, выполнятся функция addPlace

function closePopup () { // Закрываем popup при клике на кнопку
  popupEditProfile.classList.remove('popup_opened');
  popupAddPlace.classList.remove('popup_opened');
  imagePopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

const ESC_KEY = "Escape"; // Закрываем popup при нажатии Esc
function onDocumentKeyUp(event){
  if (event.key === ESC_KEY){
    closePopup();
  }
}








