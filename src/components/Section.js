export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  rendererItems(items) {
    items.forEach(this._renderer);
  }

  setItem(element){
    this._container.prepend(element);
  }
}
