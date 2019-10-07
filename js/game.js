import {Entity} from "./entity.js";
import {Npc} from "./entities/npc.js";
let timeElem = document.querySelector("#time");
let clock = document.querySelector("#time .clock");
let resourcesActions = document.querySelector("#ui .resources #actions");
let resourcesFood = document.querySelector("#ui .resources #food");

class Game {
  constructor() {
    this.preRenderEvents = [];
    this.postRenderEvents = [];
    this.preTurnEvents = [];

    this.turn = 0;

    this.actions = 4;
    this.food = 30;
  }

  get actions() {
    return this._actions;
  }

  set actions(val) {
    this._actions = val;
    resourcesActions.innerHTML = `Actions left: ${this.actions}`;
  }

  get food() {
    return this._food;
  }

  set food(val) {
    this._food = val;
    resourcesFood.innerHTML = `Food: ${this.food.toFixed(2)} units`;
  }

  get element() {
    return document.querySelector("#game");
  }

  passTurn() {
    console.log("Passing turn");
    this.actions = Entity.getEntities(Npc).length + 1;
    this.firePreTurnEvents();
    this.turn += 1;

    let hour = (this.turn + 12)%24;

    console.log();

    let sunBrightness = Math.abs(Math.sin((2*Math.PI*(this.turn%24)) / 48))/1.5;

    console.log(sunBrightness);
    clock.innerHTML = hour + ":00";

    timeElem.style.background = `rgba(0,0,0,${sunBrightness})`;

    console.log("Current turn: " + this.turn);
  }

  passTurns(amount) {
    for (var i = 0; i < amount; i++) {
      this.passTurn();
    }
  }

  addChild(child) {
    this.element.appendChild(child.element);
  }

  addEvent(target, eventRef) {
    if (typeof eventRef === "function") {
      target.push(eventRef);
    }
  }

  removeEvent(target, eventRef) {
    if (typeof eventRef === "function") {
      target.remove(eventRef);
    }
  }

  addPreTurnEvent(eventRef) {
    this.addEvent(this.preTurnEvents, eventRef);
  }

  removePreTurnEvent(eventRef) {
    this.removeEvent(this.preTurnEvents, eventRef);
  }

  addPreRenderEvent(eventRef) {
    this.addEvent(this.preRenderEvents, eventRef);
  }

  addPostRenderEvent(eventRef) {
    this.addEvent(this.postRenderEvents, eventRef);
  }

  fireEvents(source) {
    for (let eventRef of source) {
      eventRef();
    }
  }

  firePreTurnEvents() {
    this.fireEvents(this.preTurnEvents);
  }

  firePreRenderEvents() {
    this.fireEvents(this.preRenderEvents);
  }

  firePostRenderEvents() {
    this.fireEvents(this.postRenderEvents);
  }
}

export {Game};
