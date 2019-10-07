import {Entity, InteractiveEntity, Container} from "../entity.js";

class ShipContainer extends Container {
  constructor() {
    super([40, 2]);

    this.addChild(new Ship());
    this.addChild(new Entity("Ship Details", null, "ship_details.png"));
  }
}

class Ship extends InteractiveEntity {
  constructor() {
    super("Ship", [15/16, 25/16], "ship.png");

    this.element.onclick = function(e) {
      if (e.button === 0) {
        instance.passTurn();
      }
    };
  }
}

export {Ship, ShipContainer};
