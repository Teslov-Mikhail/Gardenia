import {Inventory} from "./inventory.js";
import {Navigation} from "./navigation.js";

class SeedBag extends Inventory {
  constructor() {
    super();

    this.selectedSeed = undefined;
  }
}

class SeedBagInterface extends Navigation {
  constructor(element, seedBagRef) {
    super(element);

    this.btns = [];

    this.seedBagRef = seedBagRef;
    this.seedBagRef.addOnChanged(() => {
      this.regenList();
    });
  }

  get data() {
    let seedRef = this.seedBagRef.inventory[this.selectedSeed];
    if (!seedRef) return;
    return seedRef.data;
  }

  regenList() {
    this.element.innerHTML = "";
    this.btns = [];
    for (let i = 0; i < this.seedBagRef.inventory.length; i++) {
      this.registerButton(i);
    }
  }

  registerButton(index) {
    let seed = this.seedBagRef.inventory[index];
    let label = `
      <h3>${seed.name}</h3>
      <p>Moisture: ${seed.data.moisture.toFixed(2)}</p>
      <p>Root size: ${seed.data.rootSize.toFixed(2)}</p>
      <p>Nutrition: ${seed.data.edibleness.toFixed(2)}</p>
      <p>Spreading: ${seed.data.spreading.toFixed(2)}</p>
      <p>Size: ${seed.data.size.toFixed(2)}</p>
    `;
    let newBtn = super.registerButton(label, () => {
      for (let btn of this.btns) {
        btn.active = false;
      }

      newBtn.active = true;

      this.selectedSeed = index;
    }, "list-element");

    this.btns.push(newBtn);
  }
}

export {SeedBag, SeedBagInterface};
