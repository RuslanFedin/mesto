// const cardsInitial = [ //При загрузке страницы JS добавляет 6 фотокарточек //Это массив карточек
//   {
//     name: 'Михалыч',
//     link: 'https://images.unsplash.com/photo-1568051131683-700fd7420b5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpdHR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
//   },
//   {
//     name: 'Егор Алексеевич',
//     link: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//   },
//   {
//     name: 'Пётр',
//     link: 'https://images.unsplash.com/photo-1555595925-69049e7b7682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
//   },
//   {
//     name: 'Станислав',
//     link: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//   },
//   {
//     name: 'Аркадий',
//     link: 'https://images.unsplash.com/photo-1638947693941-669835e07b4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//   },
//   {
//     name: 'Жора',
//     link: 'https://images.unsplash.com/photo-1611145949721-e5158cddf59f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
//   }
// ];



import { openPopup } from "./index.js";

export class Card {
    constructor (name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector (this._cardSelector)
            .content
            .querySelector('.elements__card')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage =  this._element.querySelector('.elements__card-image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.elements__card-title').textContent = this._name;
        this._like = this._element.querySelector('.elements__card-like');
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._like.addEventListener ('click', () => {
            this._likeCard();
        });

        this._element.querySelector('.elements__card-delete-button').addEventListener ('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener ('click', () => {
            this._openZoomPopup();
        });
    }

    _likeCard () {
        this._like.classList.toggle('elements__card-like-active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _openZoomPopup () {
        document.querySelector('.zoom-popup__card').src = this._link;
        document.querySelector('.zoom-popup__card').alt = this._name;
        document.querySelector('.zoom-popup__card-title').textContent = this._name;
        openPopup (document.querySelector('.zoom-popup'));
    }
}





import {FormValidator} from './FormValidator.js';
import {Card} from './Cards.js';

const profileEditButton = document.querySelector('.profile__intro-edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.edit-popup');
const popupAdd = document.querySelector('.add-popup');
const zoomPopup = document.querySelector('.zoom-popup');
const buttonEditPopupClose = document.querySelector('.edit-popup__close-button');
const buttonAddPopupClose = document.querySelector('.add-popup__close-button');
const zoomCloseButton = document.querySelector('.zoom-popup__close-button');
const formElementEdit = document.querySelector('.edit-popup__form');
const formElementAdd = document.querySelector('.add-popup__form');
const nameInput = document.querySelector('.popup__container-form-input_type_name');
const jobInput = document.querySelector('.popup__container-form-input_type_job');
const namePlaceInput = document.querySelector('.popup__container-form-input_type_name-place');
const urlPlaceInput = document.querySelector('.popup__container-form-input_type_url');
const nameValue = document.querySelector('.profile__intro-name');
const jobValue = document.querySelector('.profile__intro-description');
const places = [
  {
    name: 'Севастополь',
    link: 'https://cdn.pixabay.com/photo/2020/06/06/20/37/crimea-5268092_960_720.jpg'
  },
  {
    name: 'Ялта',
    link: 'https://cdn.pixabay.com/photo/2019/05/26/21/16/yalta-4231265_1280.jpg'
  },
  {
    name: 'Судак',
    link: 'https://cdn.pixabay.com/photo/2020/04/04/21/12/crimea-5003884_960_720.jpg'
  },
  {
    name: 'Бахчисарай',
    link: 'https://cdn.pixabay.com/photo/2015/01/22/18/39/ukraine-608153_960_720.jpg'
  },
  {
    name: 'Балаклава',
    link: 'https://images.pexels.com/photos/8768334/pexels-photo-8768334.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    name: 'Евпатория',
    link: 'https://sun9-84.userapi.com/sun9-40/impf/30OqZrOa5x9U64_EARl8wpMje6hN2FMmj8JzeA/XBtWIQYdCQA.jpg?size=1280x960&quality=96&sign=174c8e3e147275ec257eaf51b9d06c8a&type=album'
  }
];
const elementsCardsContainer = document.querySelector('.elements__cards');
const formElementList = {
  input: '.popup__container-form-input',
  submitButton: '.popup__container-form-button',
  inactiveButtonClass: 'popup__container-form-button_inactive',
  inputErrorClass: 'popup__container-form-input_error',
  errorTextClass: 'popup__container-form-input-text-error'
}

function creatNewCard (data) {
  const card = new Card (data.name, data.link, '#cards');
  const cardElement = card.generateCard();
  return cardElement;
}

const addNewCards = function(items) {
  creatNewCard (items);
  elementsCardsContainer.prepend(cardElement);
};

places.forEach((item) => {
  creatNewCard (item);
  elementsCardsContainer.append (cardElement);
});


const closeWithEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function closePopupOnOverlayClick (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener ('keyup', closeWithEsc);
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener ('keyup', closeWithEsc);
}

function editProfile() {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
  editProfileValidate.toggleButtonState();
  openPopup(popupEdit);
}

function editProfileForm(evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  closePopup(popupEdit);
}

const addCard = function (evt) {
  evt.preventDefault();
  const items = {};
  items.link = urlPlaceInput.value;
  items.name = namePlaceInput.value;
  addNewCards (items);
  closePopup(popupAdd);
};

buttonEditPopupClose.addEventListener('click', function () {
  closePopup(popupEdit);
});


buttonAddPopupClose.addEventListener('click', function () {
  closePopup(popupAdd);
});
zoomCloseButton.addEventListener('click', function () {
  closePopup(zoomPopup);
});
profileEditButton.addEventListener('click', () => {
  editProfile();
});

profileAddButton.addEventListener('click', () => {
  formElementAdd.reset();
  addProfileValidate.toggleButtonState();
  openPopup (popupAdd);
});

formElementEdit.addEventListener('submit', editProfileForm);
formElementAdd.addEventListener('submit', addCard);

popupAdd.addEventListener('click', closePopupOnOverlayClick);
popupEdit.addEventListener('click', closePopupOnOverlayClick);
zoomPopup.addEventListener('click', closePopupOnOverlayClick);

const editProfileValidate = new FormValidator (formElementList, formElementEdit);
editProfileValidate.enableValidation();

const addProfileValidate = new FormValidator (formElementList, formElementAdd);
addProfileValidate.enableValidation();
