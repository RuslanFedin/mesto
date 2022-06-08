export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Отрисовываем элементы
  rendererItems(items){
    items.forEach((item) => {
      this._renderer(item);
    })
  }

    // Принимаем DOM-элемент и добавляем его в контейнер
    setItem(element){
      this._container.prepend(element);
    }

}
