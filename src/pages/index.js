import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';;
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  cardsInitial,
  userData,
  buttonEditProfile,
  popupEditProfile,
  editProfileForm,
  nameInput,
  professionInput,
  buttonAddPlace,
  popupAddPlace,
  imagePopup,
  container,
  placeFormAdd,
  validationConfig,
  idConfig,
} from "../utils/constants.js"

const addCard = (data) => {
  const card = new Card ({ data,
    handleCardClick: (name, link) => {
      fullCard.open(link, name);
    }
  }, idConfig.elementTemplate);
  return card.generateCard();
}

// Создаем карточки из массива
const defaultCards = new Section ({
  data:cardsInitial,
  renderer: (item) => {
    const defaultCard = addCard (item);
    defaultCards.setItem(defaultCard);
  }
}, container);
// Отрисовываем карточки из массива
defaultCards.rendererItems();

const fullCard = new PopupWithImage (imagePopup);
const addUserInfo = new UserInfo (userData);

function editProfile() {
  const addedUserData = addUserInfo.getUserInfo();
  nameInput.value = addedUserData.name;
  professionInput.value = addedUserData.profession;
  editProfileValidation.toggleButtonState();
  editProfilePopup.open();
}

const editProfilePopup = new PopupWithForm({
  handleFormSubmit: (userData) => {
    addUserInfo.setUserInfo(userData);
    editProfilePopup.close();
  }
}, popupEditProfile);

const addCardPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    const newCard = addCard(data);
    defaultCards.setItem(newCard);
    addCardPopup.close();
  }
}, popupAddPlace);

const editProfileValidation = new FormValidator (validationConfig, editProfileForm);
const addCardValidation = new FormValidator (validationConfig, placeFormAdd);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

fullCard.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  editProfile();
});
buttonAddPlace.addEventListener('click', () => {
  addCardValidation.toggleButtonState();
  addCardPopup.open();
});
