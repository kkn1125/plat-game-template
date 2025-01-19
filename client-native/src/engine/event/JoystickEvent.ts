import GameEngine from "@core/GameEngine";

export default class JoystickEvent {
  engine: GameEngine;
  joystick: {
    w: boolean;
    a: boolean;
    d: boolean;
    s: boolean;
  } = {
    w: false,
    a: false,
    d: false,
    s: false,
  };

  constructor(engine: GameEngine) {
    this.engine = engine;
  }

  private handleKeyDown(e: KeyboardEvent) {
    const key = e.key;
    if (key === "w") {
      this.joystick.w = true;
    }
    if (key === "a") {
      this.joystick.a = true;
    }
    if (key === "d") {
      this.joystick.d = true;
    }
    if (key === "s") {
      this.joystick.s = true;
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    const key = e.key;
    if (key === "w") {
      this.joystick.w = false;
    }
    if (key === "a") {
      this.joystick.a = false;
    }
    if (key === "d") {
      this.joystick.d = false;
    }
    if (key === "s") {
      this.joystick.s = false;
    }
  }

  run() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }
}
