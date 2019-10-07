class Camera {
  constructor(viewportRef) {
    this.viewportRef = viewportRef;
    this.dragging = false;

    this._x = 0;
    this._y = 0;
    this.zoom = 3;
    this.x = -500;
    this.y = -40;
  }

  update() {
    this.viewportRef.style.transform = `scale(${this._zoom}) translate(${this._x}px, ${this._y}px)`;
  }

  get x() {
    return this._x;
  }

  set x(val) {
    this._x = Math.floor(val);
    this.update();
  }

  get y() {
    return this._y;
  }

  set y(val) {
    this._y = Math.floor(val);
    this.update();
  }

  get zoom() {
    return this._zoom;
  }

  set zoom(val) {
    this._zoom = Math.floor(val);
    this.update();
  }
}

export {Camera};
