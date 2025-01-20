import GameEngine from '@core/GameEngine';

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
  order: Gaze[] = [];

  constructor(engine: GameEngine) {
    this.engine = engine;
  }

  get controlUnit() {
    return this.engine.controlUnit;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.controlUnit) return;

    const key = e.key;
    if (key === 'w') {
      if (!this.joystick.w) {
        this.joystick.w = true;
        this.controlUnit.gaze = 'top';
        if (!this.order.includes('top')) {
          this.order.push('top');
        }
      }
    }
    if (key === 'a') {
      if (!this.joystick.a) {
        this.joystick.a = true;
        this.controlUnit.gaze = 'left';
        if (!this.order.includes('left')) {
          this.order.push('left');
        }
      }
    }
    if (key === 'd') {
      if (!this.joystick.d) {
        this.joystick.d = true;
        this.controlUnit.gaze = 'right';
        if (!this.order.includes('right')) {
          this.order.push('right');
        }
      }
    }
    if (key === 's') {
      if (!this.joystick.s) {
        this.joystick.s = true;
        this.controlUnit.gaze = 'bottom';
        if (!this.order.includes('bottom')) {
          this.order.push('bottom');
        }
      }
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (!this.controlUnit) return;
    const key = e.key;
    if (key.match(/[wsad]/)) {
      if (key === 'w') {
        this.joystick.w = false;
        this.order.splice(this.order.indexOf('top'), 1);
      }
      if (key === 's') {
        this.joystick.s = false;
        this.order.splice(this.order.indexOf('bottom'), 1);
      }
      if (key === 'a') {
        this.joystick.a = false;
        this.order.splice(this.order.indexOf('left'), 1);
      }
      if (key === 'd') {
        this.joystick.d = false;
        this.order.splice(this.order.indexOf('right'), 1);
      }
      const lastKey = this.order.at(-1);
      if (lastKey) {
        switch (lastKey) {
          case 'top': {
            this.controlUnit.gaze = 'top';
            break;
          }
          case 'bottom': {
            this.controlUnit.gaze = 'bottom';
            break;
          }
          case 'left': {
            this.controlUnit.gaze = 'left';
            break;
          }
          case 'right': {
            this.controlUnit.gaze = 'right';
            break;
          }
        }
      }
    }

    // if (key === 'w') {
    //   this.joystick.w = false;
    // }
    // if (key === 'a') {
    //   this.joystick.a = false;
    // }
    // if (key === 'd') {
    //   this.joystick.d = false;
    // }
    // if (key === 's') {
    //   this.joystick.s = false;
    // }
  }

  run() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }
}
