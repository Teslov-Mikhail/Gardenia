import {Navigation} from "./../navigation.js";
import {SeedBagInterface} from "./../seed-bag.js";

let help = document.querySelector(".help");
let scan = document.querySelector(".scan");

class Toolbar extends Navigation {
  constructor(element) {
    super(element);

    this.btn = {};
    let seedBagElem = document.querySelector('.seed-bag');
    this.seedBag = new SeedBagInterface(seedBagElem, window.inventory);
    this.seedBag.element.style.display = "none";
    help.style.display = "none";

    this.btn.none = this.registerButton("None", (e) => {
      this.seedBag.element.style.display = "none";
      help.style.display = "none";
      scan.style.display = "none";
      this.tool = "none";
    });
    this.btn.till = this.registerButton("Till", (e) => {
      this.seedBag.element.style.display = "none";
      help.style.display = "none";
      scan.style.display = "none";
      this.tool = "till";
    });
    this.btn.crop = this.registerButton("Crop", (e) => {
      this.seedBag.element.style.display = "none";
      help.style.display = "none";
      scan.style.display = "none";
      this.tool = "crop";
    });
    this.btn.seed = this.registerButton("Seed", (e) => {
      this.seedBag.element.style.display = "block";
      help.style.display = "none";
      scan.style.display = "none";
      this.tool = "seed";
    });
    this.btn.pick = this.registerButton("Pick", (e) => {
      this.seedBag.element.style.display = "none";
      help.style.display = "none";
      scan.style.display = "none";
      this.tool = "pick";
    });
    this.btn.scan = this.registerButton("Scan", (e) => {
      this.seedBag.element.style.display = "none";
      help.style.display = "none";
      scan.style.display = "block";
      this.tool = "scan";
    });
    this.btn.help = this.registerButton("Help", (e) => {
      this.seedBag.element.style.display = "none";
      help.style.display = "block";
      scan.style.display = "none";
      this.tool = "help";
    });

    this.tool = "none";
  }

  get tool() {
    return this._tool;
  }

  set tool(val) {
    for (var name in this.btn) {
      if (this.btn.hasOwnProperty(name)) {
        this.btn[name].active = false;
      }
    }
    this.btn[val].active = true;
    this._tool = val;
  }
}

export {Toolbar};
