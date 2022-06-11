export default class Card {
  constructor({data, userId, handleCardClick, handleDeleteCard, setLike, removeLike}, cardSelector) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector)
      .content
      .querySelector('.element-item')
      .cloneNode(true);
  }

  _isIdOwn() {
    if (this._userId !== this._ownerId) {
      this._buttonRemove.remove();
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _unlike(){
    this._buttonLike.classList.remove('element-item__like_active');
    this._removeLike(this._data);
  }

  _like(){
    this._buttonLike.classList.add('element-item__like_active');
    this._setLike(this.data);
  }

  _isLikeOwn() {
    this._likes.forEach((likeOwner) => {
      if (likeOwner._id === this._userId) {
        this._buttonLike.classList.add('element-item__like_active');
      }
    })
  }

  setLikesCounter(data) {
    this._counter.textContent = data.likes.length;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      if (this._buttonLike.classList.contains('element-item__like_active')){
        this._unlike(this._data);
      } else {
        this._like(this._data);
      }
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

    this._isIdOwn();
    this._isLikeOwn();
    this._setEventListeners();
    this.setLikesCounter(this._data);

    return this._element;
  }
}

