import {Npc} from "../npc.js";

class Soldier extends Npc {
  constructor(name, position, sprite) {
    super("Soldier", [39, 14], "people/story/soldier-idle.png", 22);
  }
}

export {Soldier};
