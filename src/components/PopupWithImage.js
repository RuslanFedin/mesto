import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.popup__image-full');
    this._title = this._popupSelector.querySelector('.popup__image-tittle');
  }

  open (name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
