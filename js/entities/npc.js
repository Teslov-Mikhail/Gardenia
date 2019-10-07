import {InteractiveEntity} from "../entity.js";

class Npc extends InteractiveEntity {
  constructor(name, position, sprite, frames) {
    super(name, position, sprite);

    this.frames = frames;

    this.element.style.width = "16px";
    this.element.style.height = "24px";
    this.element.style.objectFit = "none";
    this.element.style.objectPosition = "0 0";

    setInterval(() => {
      this.animate();
    }, 100);

    this.lastEaten = 8;
    this.foodNeeded = 1;
    this.eatsEvery = 8;

    this.boundTick = this.tick.bind(this);
    instance.addPreTurnEvent(this.boundTick);
  }

  tick() {
    if (this.lastEaten > 1) {
      this.lastEaten -= 1;
    } else {
      this.lastEaten = this.eatsEvery;
      instance.food -= this.foodNeeded;
    }
  }

  destroy() {
    instance.removePreTurnEvent(this.boundTick);
    super.destroy();
  }

  get animFrame() {
    return Number(
      this.element.style.objectPosition.split(" ")[0].replace("px","")
    ) * -1 / 16;
  }

  set animFrame(val) {
    this.element.style.objectPosition = -val*16 + "px 0";
  }

  animate() {
    if (this.animFrame < this.frames-1) {
      this.animFrame += 1;
    } else {
      this.animFrame = 0;
    }
  }
}

export {Npc};
