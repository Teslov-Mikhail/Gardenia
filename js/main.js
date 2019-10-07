import {Game} from "./game.js";
import {Camera} from "./camera.js";
import {Toolbar} from "./navigation/toolbar.js";
import {Entity} from "./entity.js";
import {ShipContainer} from "./entities/ship.js";
import {Botanist} from "./entities/npcs/botanist.js";
import {Soldier} from "./entities/npcs/soldier.js";
import {Engineer} from "./entities/npcs/engineer.js";
import {Tile} from "./entities/tile.js";
import {Inventory} from "./inventory.js";
import {SeedBag} from "./seed-bag.js";
import {PlantData} from "./data/plant-data.js";
import {Compost} from "./entities/compost.js";

window.instance = new Game();
let camera = new Camera(instance.element);
window.inventory = new SeedBag();
window.toolbar = new Toolbar(document.querySelector("#ui nav.tools"));

instance.addChild(
  new ShipContainer()
);

let botanistTest = new Botanist();
let soldierTest = new Soldier();
let engineerTest = new Engineer();

let compost = new Compost();

instance.addChild(botanistTest);
instance.addChild(soldierTest);
instance.addChild(engineerTest);
instance.addChild(compost);

inventory.addItem({
  name: "Greenweed seeds",
  data: PlantData.getPlantData("greenweed")
});

inventory.addItem({
  name: "Drygrass seeds",
  data: PlantData.getPlantData("drygrass")
});

document.onmousedown = function(e) {
  e.preventDefault();
  if (e.button === 1 || toolbar.tool === "none") {
    camera.dragging = true;
    return;
  }
};

document.onmouseup = function(e) {
  camera.dragging = false;
};

instance.element.onclick = function(e) {
  if (e.target !== instance.element) return;
  if (toolbar.tool !== "till") return;
  if (instance.actions < 1) return;
  let newTile = new Tile([
    Math.floor((e.x / camera.zoom - camera.x) / 16),
    Math.floor((e.y / camera.zoom - camera.y) / 16)
  ]);
  instance.addChild(newTile);
  instance.actions -= 1;
};

document.onmousemove = function(e) {
  if (camera.dragging) {
    camera.x += e.movementX / camera.zoom;
    camera.y += e.movementY / camera.zoom;
  }
};

function animate(timestamp) {
  instance.firePreRenderEvents();
  window.requestAnimationFrame(animate);
  instance.firePostRenderEvents();
}

window.requestAnimationFrame(animate);
