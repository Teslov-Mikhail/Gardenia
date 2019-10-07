import {Npc} from "../npc.js";

class Engineer extends Npc {
  constructor(name, position, sprite) {
    super("Engineer", [47, 12], "people/story/engineer-idle.png", 20);
  }
}

export {Engineer};
