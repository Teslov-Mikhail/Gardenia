import {Entity} from "../entity.js";

class Compost extends Entity {
  constructor() {
    super("Compost", [52, 13], "compost.png", true);

    let boundClick = this.onClick.bind(this);
    this.element.onclick = boundClick;
  }

  onClick() {
    if (toolbar.tool === "seed") {
      let seedBagRef = window.toolbar.seedBag;
      if (!seedBagRef.data) return;

      window.inventory.removeItemIndex(seedBagRef.selectedSeed);
    }
  }
}

export {Compost};
