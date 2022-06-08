import { data } from "autoprefixer";

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

   // Проверяем выполнение промиса
  _handleResponse(resolve) {
    if (resolve.ok) {
    // Если успешно, возвращаем ответ в формате json
      return resolve.json();
    } else {
    // Возврщаем выполненный promise с ошибкой
    return Promise.reject(`ERROR: ${data.status}`);
    }
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then((data) => this._handleResponse(data))
  }

  // Загрузка карточек с сервера
  getCards() {
    return fetch(`${this.baseUrl}/cards`,{
      headers: this.headers
    })
    .then((data) => this._handleResponse(data));
  }

  // Редактирование данных профиля
  editUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`,{
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then((data) => this._handleResponse(data));
  }

    // Добавление новой карточки
    createCard(data) {
      return fetch(`${this.baseUrl}/cards`,{
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        })
      })
      .then((data) => this._handleResponse(data))
    }


  // Изменение аватара пользователя
  editUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`,{
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((data) => this._handleResponse(data));
  }

  // Удаление карточки
  deleteCard(data) {
    return fetch(`${this.baseUrl}/cards/${cardId}`,{
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then((data) => this._handleResponse(data));
  }

  // Лайкнуть карточку
  setLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`,{
      method: 'PUT',
      headers: this.headers,
    })
    .then((cardId) => this._handleResponse(cardId));
  }

  // Убрать лайк
  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`,{
      method: 'DELETE',
      headers: this.headers,
    })
    .then((cardId) => this._handleResponse(cardId));
  }
}
