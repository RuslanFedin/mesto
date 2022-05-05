import { openPopup } from './index.js';

const cardsInitial = [ //При загрузке страницы JS добавляет 6 фотокарточек //Это массив карточек
  {
    name: 'Михалыч',
    link: 'https://images.unsplash.com/photo-1568051131683-700fd7420b5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpdHR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Егор Алексеевич',
    link: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Пётр',
    link: 'https://images.unsplash.com/photo-1555595925-69049e7b7682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Станислав',
    link: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Аркадий',
    link: 'https://images.unsplash.com/photo-1638947693941-669835e07b4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Жора',
    link: 'https://images.unsplash.com/photo-1611145949721-e5158cddf59f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  }
];

class Card {
  // Создаем конструктор с данными карточки и ее template-элементом
  constructor(data, template) {
    this._link = data.link;
    this._name = data.name;
    this._template = template;
  }

  // Вызываем и создаем функцию получения template разметки
  _getTemplate() {
    // Забираем HTML разметку и клонируем элемент
    const cardElement = document.querySelector('#element-template')
      .content
      .querySelector('.element-item')
      .cloneNode(true);

    // Вернем DOM-элемент карточки
    return cardElement;
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
    const imagePopup = document.querySelector('.popup_image-place');
    const imageFull = imagePopup.querySelector('.popup__image-full');
    const imageTittle = imagePopup.querySelector('.popup__image-tittle');
    imageFull.src = this._link;
    imageFull.alt = this._name;
    imageTittle.textContent = this._name;
    openPopup(imagePopup);
  }

}

export { cardsInitial, Card };
