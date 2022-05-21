export default class Card {
  // Создаем конструктор с данными карточки и ее template-элементом
  constructor({data, handleCardClick}, cardSelector) {
    this._link = data.link;
    this._name = data.nameplace;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  // Получаем template разметку, клонируем элемент и возвращаем.
  _getTemplate() {
    return document.querySelector(this._cardSelector)
      .content
      .querySelector('.element-item')
      .cloneNode(true);
  }

  // Добавим данные в разметку
  generateCard() {
    this._element = this._getTemplate();

    this._cardPicture = this._element.querySelector('.element-item__image');
    this._cardTitle = this._element.querySelector('.element-item__title');
    this._buttonLike = this._element.querySelector('.element-item__like');
    this._buttonRemove = this._element.querySelector('.element-item__remove');

    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._cardTitle.textContent = this._name;


    this._setEventListeners();

    return this._element;
  }

  // Устанавливаем слушатели событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._buttonRemove.addEventListener('click', () => {
      this._removeCard();
    });

    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  // Метод обработки лайка
  _handleLikeClick() {
    this._buttonLike.classList.toggle('element-item__like_active');
  }

  // Метод удаления карточки
  _removeCard() {
    this._element.remove();
    this._element = null;
  }
}

