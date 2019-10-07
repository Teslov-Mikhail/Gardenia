class Inventory {
  constructor() {
    this._inventory = [];
    this.onChanged = [];
  }

  callOnChanged() {
    for (let eventRef of this.onChanged) {
      eventRef();
    }
  }

  addOnChanged(eventRef) {
    if (typeof eventRef === "function") {
      this.onChanged.push(eventRef);
    }
  }

  addItem(item) {
    this.inventory.push(item);
    this.callOnChanged();
  }

  removeItem(item) {
    this.inventory.remove(item);
    this.callOnChanged();
  }

  removeItemIndex(index) {
    this.inventory.splice(index, 1);
    this.callOnChanged();
  }

  get inventory() {
    return this._inventory;
  }

  set inventory(val) {
    this.callOnChanged();
    this._inventory = val;
  }
}

export {Inventory};
