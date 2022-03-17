const editButton = document.querySelector('.profile__edit-button'); // Запрашиваем кнопку редактирования профиля
const popupElement = document.querySelector('.popup'); // Запрашиваем попап
const closeButton = popupElement.querySelector('.popup__close-button'); // Запрашиваем кнопку закрытия попапа
const ESC_KEY = "Escape"; // Объявляем клавишу Esc

let formElement = document.querySelector('.popup__container'); // Запрашиваем форму попапа
let nameInput = formElement.querySelector('.popup__name'); // Запрашиваем строку ввода имени
let professionInput = formElement.querySelector('.popup__profession'); // Запрашиваем строку ввода професии
let Name = document.querySelector('.profile__name'); // Находим  элемент с изменяемым текстом
let Profession = document.querySelector('.profile__profession'); //Находим  элемент с изменяемым текстом

function OpenPopup () {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
  nameInput.value = Name.textContent;
  professionInput.value = Profession.textContent;
}

function ClosePopup () {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event){
  if (event.key === ESC_KEY){
    ClosePopup();
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  Name.textContent = nameInput.value; // Вставляем текстовое содержимое из value в элемент.
  Profession.textContent = professionInput.value; // Вставляем текстовое содержимое из value в элемент.
  ClosePopup();
}

editButton.addEventListener('click', OpenPopup); // Обработчик событий на кнопке редактирования профиля.
closeButton.addEventListener('click', ClosePopup); // Обработчик событий на кнопке закрытия формы.
formElement.addEventListener('submit', formSubmitHandler); // Обработчик событий в форме попапа: он будет следить за событием “submit” - «отправка»
