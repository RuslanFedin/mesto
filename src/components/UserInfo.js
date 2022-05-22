export default class UserInfo {
  constructor({name, profession}) {
    this._name = document.querySelector(name);
    this._profession = document.querySelector(profession);
  }

  // Возвращаем объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._profession.textContent,
    }
  }

    // Принимаем новые данные пользователя и добавляет их на страницу.
  setUserInfo(obj) {
    this._name.textContent = obj.name;
    this._profession.textContent = obj.profession;
  }
}

