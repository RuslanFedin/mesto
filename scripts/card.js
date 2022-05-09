import { openPopup, imagePopup, imageFull, imageTittle  } from './index.js';

class Card {
  // Создаем конструктор с данными карточки и ее template-элементом
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  // Вызываем и создаем функцию получения template разметки
  _getTemplate() {
    // Забираем HTML разметку, клонируем элемент и возвращаем DOM-элемент карточки
    return document.querySelector(this._cardSelector)
      .content
      .querySelector('.element-item')
      .cloneNode(true);
  }

  // Подготовим карточку. Добавим данные в разметку
  generateCard() {
    // Запишем разметку в приватное поле _element, чтобы у других элементов появился доспуп к ней.
    this._element = this._getTemplate();
    // Добавим элементы карточки
    this._buttonLike = this._element.querySelector('.element-item__like');
    this._buttonRemove = this._element.querySelector('.element-item__remove');
    this._cardPicture = this._element.querySelector('.element-item__image');
    this._cardTitle = this._element.querySelector('.element-item__title');

    // Добавим данные
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Вызовем установку слушателей
    this._setEventListeners();
    // Вернем элемент наружу
    return this._element;
  }


  // Создаем метод установки слушателей событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._buttonRemove.addEventListener('click', () => {
      this._element.remove();
    });

    this._cardPicture.addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }

  // Создаем метод обработки лайка
  _handleLikeClick() {
    this._buttonLike.classList.toggle('element-item__like_active');
  }

  // Создаем метод просмотра карточки
  _handleOpenPopup() {
    imageFull.src = this._link;
    imageFull.alt = this._name;
    imageTittle.textContent = this._name;
    openPopup(imagePopup);
  }

}

export { Card };
