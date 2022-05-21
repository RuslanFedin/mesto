export default class UserInfo {
  constructor({name, profession}) {
    this._name = document.querySelector(name);
    this._profession = document.querySelector(profession);
    this._nameInput = document.querySelector('.popup__input_name');
    this._professionInput = document.querySelector('.popup__input_profession');
  }

  // Возвращаем объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const data = {};
    this._nameInput.value = this._name.textContent;
    this._professionInput.value = this._profession.textContent;
    data.name = this._nameInput.value;
    data.profession = this._professionInput.value;

    return data;
  }

    // Принимаем новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._profession.textContent = data.profession;
  }
}

