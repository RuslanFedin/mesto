export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Отрисовываем элементы
  rendererItems(){
    this._initialArray.forEach((item) => {
      this._renderer(item);
    })
  }

    // Принимаем DOM-элемент и добавляем его в контейнер
    setItem(element){
      this._container.prepend(element);
    }

}
