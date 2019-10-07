import {Entity, Container} from "../entity.js";
import {Crop} from "./crop.js";
import {Plant} from "./plant.js";

let scan = document.querySelector(".scan");

class RandomGround extends Entity {
  constructor(name, position, spritesheet, tiles, interactive) {
    super(name, position, spritesheet, interactive);

    this.element.style.width = "16px";
    this.element.style.height = "16px";
    this.element.style.objectFit = "none";
    this.element.style.objectPosition = "0 0";

    this.spriteIndex = Math.floor(Math.random()*tiles);
  }

  get spriteIndex() {
    return Number(
      this.element.style.objectPosition.split(" ")[0].replace("px","")
    ) * -1 / 16;
  }

  set spriteIndex(val) {
    this.element.style.objectPosition = -val*16 + "px 0";
  }
}

class Ground extends RandomGround {
  constructor() {
    super("Tiled Ground", null, "tiled-dirt.png", 4, true);
  }
}

class Tile extends Container {
  constructor(position) {
    super(position);

    this.ground = new Ground();
    this.addChild(this.ground);

    let boundClick = this.onClick.bind(this);
    this.element.onclick = boundClick;
  }

  get isEmpty() {
    return !this.seed && this.crop;
  }

  get isPlantable() {
    return this.isEmpty && this.crop.type === "regular";
  }

  onClick() {
    if (toolbar.tool === "crop") {
      this.addCrop();
    } else if (toolbar.tool === "seed") {
      this.addSeedFromInventory();
    } else if (toolbar.tool === "pick") {
      this.pickUp();
    } else if (toolbar.tool === "scan") {
      let seed = this.seed;
      if (!seed) return;
      console.log(this.seed.data);
      scan.innerHTML = `
        <h3>${seed.name}</h3>
        <p>Moisture: ${seed.data.moisture.toFixed(2)}</p>
        <p>Root size: ${seed.data.rootSize.toFixed(2)}</p>
        <p>Nutrition: ${seed.data.edibleness.toFixed(2)}</p>
        <p>Spreading: ${seed.data.spreading.toFixed(2)}</p>
        <p>Size: ${seed.data.size.toFixed(2)}</p>
      `;
    }
  }

  pickUp() {
    if (!this.seed || !this.crop || instance.actions < 1) return;
    if (this.seed) {
      this.seed.pickUp();
      this.element.removeChild(this.seed.element);
      this.seed = undefined;
    }
    if (this.crop) {
      this.element.removeChild(this.crop.element);
      this.crop.destroy();
      this.crop = undefined;
    }

    instance.actions -= 1;
  }

  addCrop() {
    if (this.seed) return;

    if (!this.crop) {
      if (instance.actions < 1) return;
      this.crop = new Crop();
      this.addChild(this.crop);
      instance.actions -= 1;
    } else {
      if (this.crop.type === "regular") {
        this.crop.type = "cross";
      } else {
        this.crop.type = "regular";
      }
    }
  }

  addSeed(data) {
    if (this.seed) return;
    if (!this.crop) return;

    this.crop.type = "regular";
    this.seed = new Plant(data);
    this.addChild(this.seed);

    return this.seed;
  }

  addSeedFromInventory() {
    if (instance.actions < 1) return;

    let seedBagRef = window.toolbar.seedBag;
    if (!seedBagRef.data) return;

    if (this.addSeed(seedBagRef.data)) {
      window.inventory.removeItemIndex(seedBagRef.selectedSeed);
      instance.actions -= 1;
    }
  }

  tickSeed() {
    if (!this.seed) return;
    if (!this.seed.tick) return;

    this.seed.tick();
  }
}

export {Tile};
