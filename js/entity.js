let entities = [];

class Container {
  constructor(position) {
    this.id = entities.length;
    entities.push(this);
    this.element = document.createElement("div");
    this.element.draggable = false;
    this.element.classList.add("entity");
    this.position = position || [0,0];
  }

  destroy() {
    entities.splice(this.id, 1);
  }

  addChild(child) {
    this.element.appendChild(child.element);
    child.parent = this;
  }

  get position() {
    return [
      Number(this.element.style.left.replace("px","")) / 16,
      Number(this.element.style.top.replace("px","")) / 16
    ];
  }

  set position(val) {
    this.element.style.left = val[0] * 16 + "px";
    this.element.style.top = val[1] * 16 + "px";
    this.element.style.zIndex = val[1];
  }

  static getEntities(classRef) {
    if (classRef) {
      let filteredEntities = [];

      for (let entity of entities) {
        if (entity instanceof classRef) {
          filteredEntities.push(entity);
        }
      }

      return filteredEntities;
    }
    return entities;
  }

  static getEntitiesByPosition(position, classRef) {
    let filteredEntities = Entity.getEntities(classRef);
    let result = [];

    for (let entity of filteredEntities) {
      if (
        entity.position[0] === position[0] &&
        entity.position[1] === position[1]
      ) {
        result.push(entity);
      }
    }

    return result;
  }
}

class Entity extends Container {
  constructor(name, position, sprite, interactive) {
    super(position);
    this.element = document.createElement("img");
    this.element.draggable = false;
    this.element.classList.add("entity");

    this.name = name || "Unnamed";
    this.position = position || [0,0];
    this.sprite = sprite || "";

    if (interactive) this.element.classList.add("interactive");
  }

  get sprite() {
    return this._sprite;
  }

  set sprite(val) {
    this._sprite = val;
    this.element.src = "gfx/" + val;
  }
}

class InteractiveEntity extends Entity {
  constructor(name, position, sprite) {
    super(name, position, sprite, true);
  }
}

export {Entity, InteractiveEntity, Container};
