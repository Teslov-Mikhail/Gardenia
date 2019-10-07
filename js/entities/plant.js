import {Entity} from "./../entity.js";
import {Tile} from "./tile.js";
import {PlantData} from "./../data/plant-data.js";

class Plant extends Entity {
  constructor(reference) {
    super(reference.name, null, reference.sprite);

    this.element.style.top = "-8px";
    this.element.style.width = "16px";
    this.element.style.height = "24px";
    this.element.style.objectFit = "none";
    this.element.style.objectPosition = "0 0";

    this._growState = 0;
    this.adultStage = 3;

    this.toSerialize = [];

    for (var prop in reference) {
      if (reference.hasOwnProperty(prop)) {
        this[prop] = reference[prop];
        this.toSerialize.push(prop);
      }
    }

    this.boundTick = this.tick.bind(this);
    instance.addPreTurnEvent(this.boundTick);
  }

  destroy() {
    instance.removePreTurnEvent(this.boundTick);
    super.destroy();
  }

  get data() {
    let temp = {};

    for (let prop of this.toSerialize) {
      temp[prop] = this[prop];
    }

    return temp;
  }

  get growState() {
    return this._growState;
  }

  set growState(val) {
    this._growState = val.clamp(0,this.adultStage);
    this.element.style.objectPosition = -Math.floor(this._growState)*16 + "px 0";
  }

  pickUp() {
    if (this.growState === this.adultStage) {
      instance.food += (this.size + this.rootSize) * this.edibleness;
    }
    window.inventory.addItem({
      name: this.name + " seeds",
      data: this.data
    });
    this.destroy();
  }

  get growRate() {
    return this.moisture / this.size;
  }

  get isAdult() {
    return this.growState === this.adultStage;
  }

  get realPosition() {
    let position = this.position;
    if (this.parent) position = this.parent.position;

    return position;
  }

  get tilesAround() {
    let position = this.realPosition;

    return [].concat(this.tilesAroundDiag, this.tilesAroundOrto);
  }

  get tilesAroundDiag() {
    let position = this.realPosition;

    return [
      Entity.getEntitiesByPosition([position[0]-1, position[1]-1], Tile)[0],
      Entity.getEntitiesByPosition([position[0]+1, position[1]-1], Tile)[0],
      Entity.getEntitiesByPosition([position[0]-1, position[1]+1], Tile)[0],
      Entity.getEntitiesByPosition([position[0]+1, position[1]+1], Tile)[0]
    ];
  }

  get tilesAroundOrto() {
    let position = this.realPosition;

    return [
      Entity.getEntitiesByPosition([position[0]-1, position[1]], Tile)[0],
      Entity.getEntitiesByPosition([position[0]+1, position[1]], Tile)[0],
      Entity.getEntitiesByPosition([position[0], position[1]-1], Tile)[0],
      Entity.getEntitiesByPosition([position[0], position[1]+1], Tile)[0]
    ];
  }

  spread() {
    if (!this.isAdult) return;

    let tilesAround = this.tilesAroundOrto;

    let emptyCrops = [];

    for (let tile of tilesAround) {
      if (tile && tile.isPlantable) {
        emptyCrops.push(tile);
      }
    }

    if (emptyCrops.length === 0) return;

    emptyCrops.random().addSeed(this.data);
  }

  breed() {
    if (!this.isAdult) return;

    let tilesAround = this.tilesAround;
    let emptyCrops = [];

    for (let tile of tilesAround) {
      if (tile && tile.isEmpty && tile.crop.type === "cross") {
        emptyCrops.push(tile);
      }
    }

    if (emptyCrops.length === 0) return;

    let randomCrop = emptyCrops.random();

    let position = this.realPosition;

    let otherSide = [
      (randomCrop.position[0] - position[0]) * 2 + position[0],
      (randomCrop.position[1] - position[1]) * 2 + position[1]
    ];

    let tileOnOtherSide = Entity.getEntitiesByPosition(otherSide, Tile)[0];

    if (!tileOnOtherSide) return;

    let otherSidePlant = tileOnOtherSide.seed;

    if (!otherSidePlant || !otherSidePlant.isAdult) return;

    console.log("This plant: ", this.data);
    console.log("Other plant: ", otherSidePlant.data);

    let newPlantData = {};

    for (let prop of this.toSerialize) {
      let modifier = +(Math.random()/10).toFixed(2);
      newPlantData[prop] = ((this.data[prop] + otherSidePlant.data[prop]) / 2) + modifier;
    }

    console.log(newPlantData);

    let newPlant = PlantData.getClosest(newPlantData);

    console.log(newPlant);

    randomCrop.addSeed(newPlant);
  }

  tick() {
    let action = [
      this.spread.bind(this),
      this.breed.bind(this)
    ].random();


    if (Math.random() < this.spreading) {
      action();
    }

    this.growState += this.growRate;
  }
}

export {Plant};
