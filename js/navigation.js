class Button {
  constructor(label, action, className) {
    this.element = document.createElement("div");
    this.element.innerHTML = label;
    this.element.classList.add(className || "btn");
    this.element.onclick = (e) => {
      this.action(e);
    };
    this.event = action;
  }

  action(e) {
    if (this.event) {
      this.event();
    }
  }

  get active() {
    return this.element.classList.contains("active");
  }

  set active(val) {
    if (val) {
      this.element.classList.add("active");
    } else {
      this.element.classList.remove("active");
    }
  }
}

class Navigation {
  constructor(element) {
    this.element = element;
  }

  registerButton(label, action, className) {
    let newBtn = new Button(label, action, className);
    this.element.appendChild(newBtn.element);
    return newBtn;
  }
}

export {Navigation};
