export default class Card {
  constructor({data, userId, handleCardClick, handleDeleteCard, //setLike, removeLike
handleLikeCard}, cardSelector) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector)
      .content
      .querySelector('.element-item')
      .cloneNode(true);
  }

  _hideButtonRemove() {
    if (this._userId !== this._ownerId) {
      this._buttonRemove.classList.add('element-item__remove-hidden');
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked = () => this._likes.likes.some((owner) => owner._id === this._userId);

  setActiveClass = () => {
    this._buttonLike.classList.add('element-item__like_active');
  }

  removeActiveClass = () => {
    this._buttonLike.classList.remove('element-item__like_active');
  }

  checkOwnLike() {
    this.isLiked() ? this.setActiveClass() : this.removeActiveClass();
  }

  setLikes(newData) {
   this._likes = newData;
   this.checkOwnLike(newData);
   this._counter.textContent = newData.likes.length;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard(this._data);
    });
    this._buttonRemove.addEventListener('click', () => {
     this._handleDeleteCard();
    });
    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPicture = this._element.querySelector('.element-item__image');
    this._cardTitle = this._element.querySelector('.element-item__title');
    this._buttonLike = this._element.querySelector('.element-item__like');
    this._counter = this._element.querySelector('.element-item__counter');
    this._buttonRemove = this._element.querySelector('.element-item__remove');

    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._hideButtonRemove();
    this.setLikes(this._data);
    this._setEventListeners();
    return this._element;
  }
}

