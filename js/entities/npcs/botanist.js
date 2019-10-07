import {Npc} from "../npc.js";

class Botanist extends Npc {
  constructor(name, position, sprite) {
    super("Botanist", [38, 13], "people/story/botanist-idle.png", 25);
  }
}

export {Botanist};
