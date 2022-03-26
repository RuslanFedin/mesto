const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close-button');
const ESC_KEY = "Escape";

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let professionInput = formElement.querySelector('.popup__profession');
let name = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');

function openPopup () {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
  nameInput.value = name.textContent;
  professionInput.value = profession.textContent;
}

function closePopup () {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event){
  if (event.key === ESC_KEY){
    closePopup();
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  name.textContent = nameInput.value; // Вставляем текстовое содержимое из value в элемент.
  profession.textContent = professionInput.value; // Вставляем текстовое содержимое из value в элемент.
  closePopup();
}

editButton.addEventListener('click', openPopup); // Обработчик событий на кнопке редактирования профиля.
closeButton.addEventListener('click', closePopup); // Обработчик событий на кнопке закрытия формы.
formElement.addEventListener('submit', formSubmitHandler); // Обработчик событий в форме попапа: он будет следить за событием “submit” - «отправка»
