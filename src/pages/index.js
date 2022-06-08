import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import {
  userData,
  buttonEditProfile,
  popupEditProfile,
  editProfileForm,
  nameInput,
  professionInput,
  buttonAddPlace,
  popupAddPlace,
  popupDeleteImage,
  imagePopup,
  container,
  placeFormAdd,
  validationConfig,
  idConfig,
} from "../utils/constants.js";
import Api from '../components/Api.js';

let userId = null;

//Создаем экземпляр Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '7b11d0b8-523b-4f37-90de-4f1e8f1ef0ac',
    'Content-Type': 'application/json'
}
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    // console.log(userData);

    addUserInfo.setUserInfo(userData);

    initialCards.reverse();
    cards.rendererItems(initialCards);
  })
  .catch((error) => {
    console.log(error);
  })

const addUserInfo = new UserInfo(userData);

const editProfilePopup = new PopupWithForm({
  handleFormSubmit: (userData) => {
    api.editUserInfo(userData)
      .then((resolve) => {
        addUserInfo.setUserInfo(resolve);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
      .finally(() => {
        editProfilePopup.close();
        console.log(api.editUserInfo(userData));
      })
  }
}, popupEditProfile);

const cards = new Section({ // Создаем карточки из массива
  items: [],
  renderer: (items) => {
    const card = addCard (items);
    cards.setItem(card);
  }
}, container);

const addCardPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    console.log(data);
    api.createCard(data)
    .then((resolve) => {
      const newCard = addCard(resolve);
      cards.setItem(newCard);
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    })
    .finally(() => {
      addCardPopup.close();
    })
  }
}, popupAddPlace);

const addCard = (data) => {
  const card = new Card ({
    data,
    userId,
    handleCardClick: () => {
      fullCard.open(data.name, data.link);
    },
    handleDeleteCard: () => {
      deleteCardPopup.open();
    },
  }, idConfig.elementTemplate);
  // console.log(data.owner._id);
  // console.log(card.isIdOwn);
  // console.log(userId);
  return card.generateCard();
}

const fullCard = new PopupWithImage(imagePopup);






//------------------------------------------------Удаление карточки---------------------//


const deleteCardPopup = new PopupWithSubmit({
  handleFormSubmit: (data, cardElement, cardId) => {
    api.deleteCard(data, cardId)
    .then((resolve) => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    })
    .finally(() => {
      deleteCardPopup.close();
    })
  }
}, popupDeleteImage);

//--------------------------------------------------------------//



const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
const addCardValidation = new FormValidator(validationConfig, placeFormAdd);


function editProfile() {
  const addedUserData = addUserInfo.getUserInfo();
  nameInput.value = addedUserData.name;
  professionInput.value = addedUserData.about;
  editProfileValidation.toggleButtonState();
  editProfilePopup.open();
}

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

fullCard.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  editProfile();
});
buttonAddPlace.addEventListener('click', () => {
  addCardValidation.toggleButtonState();
  addCardPopup.open();
});



