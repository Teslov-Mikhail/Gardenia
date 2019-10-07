import {Entity} from "../entity.js";

class Crop extends Entity {
  constructor(position) {
    super("Crop", position, "crop.png");

    this.element.style.top = "-8px";

    this.type = "regular";
  }

  get type() {
    return this._type;
  }

  set type(val) {
    this._type = val;
    this.sprite = `crop_${val}.png`;
  }
}

export {Crop};
