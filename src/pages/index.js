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
  popupChangeAvatar,
  avatarChangeForm,
  buttonChangeAvatar,
  popupDeleteImage,
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
} from "../utils/constants.js";
import Api from '../components/Api.js';

let userId = null;
let deletedCard = null;

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
    addUserInfo.setUserInfo(userData);
    addUserInfo.setUserAvatar(userData);
    initialCards.reverse();
    cards.rendererItems(initialCards);
  })
  .catch((error) => {
    console.log(error);
  })

const addUserInfo = new UserInfo(userData);
const cards = new Section({ // Создаем карточки из массива
  items: [],
  renderer: (items) => {
    const card = addCard (items);
    cards.setItem(card);
  }
}, container);

const addCard = (data) => {
  const card = new Card ({
    data, userId,
    handleCardClick: () => {
      fullCard.open(data.name, data.link);
    },
    handleDeleteCard: () => {
      deletedCard = card;
      deleteCardPopup.open(deletedCard);
    },
    setLike: () => {
      api.setLike(data)
      .then((data) => {
        card.setLikesCounter(data);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
    },
    removeLike: () => {
      api.removeLike(data)
      .then((data) => {
        card.setLikesCounter(data);
      })
    },
  }, idConfig.elementTemplate);

  return card.generateCard();
}

const addCardPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    addCardPopup.toogleButtonText(true);
    api.createCard(data)
    .then((resolve) => {
      const newCard = addCard(resolve);
      cards.setItem(newCard);
      addCardPopup.toogleButtonText(false);
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    })
    .finally(() => {
      addCardPopup.toogleButtonText(false)
      addCardPopup.close();
    })
  }
}, popupAddPlace);

const editProfilePopup = new PopupWithForm({
  handleFormSubmit: (userData) => {
    editProfilePopup.toogleButtonText(true);
    api.editUserInfo(userData)
      .then((resolve) => {
        addUserInfo.setUserInfo(resolve);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
      .finally(() => {
        editProfilePopup.close();
        editProfilePopup.toogleButtonText(false);
      })
  }
}, popupEditProfile);

const deleteCardPopup = new PopupWithSubmit({
  handleFormSubmit: (data) => {
    api.deleteCard(data)
    .then(() => {
      deletedCard.removeCard();
    })
    .then(() => {
      deletedCard = null;
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    })
    .finally(() => {
      deleteCardPopup.close();
    })
  }
}, popupDeleteImage);

const changeAvatarPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    changeAvatarPopup.toogleButtonText(true);
    api.editUserAvatar(data)
    .then((data) => {
      addUserInfo.setUserAvatar(data);
      changeAvatarPopup.toogleButtonText(false);
    })
    .catch((error => {
      console.log(`ERROR: ${error}`);
    }))
    .finally(() => {
      changeAvatarPopup.toogleButtonText(false);
      changeAvatarPopup.close();
    })
  }
}, popupChangeAvatar);

const fullCard = new PopupWithImage(imagePopup);

const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
const addCardValidation = new FormValidator(validationConfig, placeFormAdd);
const changeAvatarValidation = new FormValidator(validationConfig, avatarChangeForm);


function editProfile() {
  const addedUserData = addUserInfo.getUserInfo();
  nameInput.value = addedUserData.name;
  professionInput.value = addedUserData.about;
  editProfileValidation.toggleButtonState();
  editProfilePopup.open();
}

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
changeAvatarValidation.enableValidation();


fullCard.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
changeAvatarPopup.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  editProfile();
});
buttonAddPlace.addEventListener('click', () => {
  addCardValidation.toggleButtonState();
  addCardPopup.open();
});
buttonChangeAvatar.addEventListener('click', () => {
  changeAvatarPopup.open();
});




