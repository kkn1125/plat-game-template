import GameEngine from '@core/GameEngine';
import { Npc, Unit } from '@model/unit';

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

  manualKeyDown(unit: Unit, key: 'w' | 'a' | 's' | 'd') {
    if (key === 'w') {
      if (!this.joystick.w) {
        unit.gaze = 'top';
        if (!unit.order.includes('top')) {
          unit.order.push('top');
        }
      }
    }
    if (key === 'a') {
      if (!this.joystick.a) {
        unit.gaze = 'left';
        if (!unit.order.includes('left')) {
          unit.order.push('left');
        }
      }
    }
    if (key === 'd') {
      if (!this.joystick.d) {
        unit.gaze = 'right';
        if (!unit.order.includes('right')) {
          unit.order.push('right');
        }
      }
    }
    if (key === 's') {
      if (!this.joystick.s) {
        unit.gaze = 'bottom';
        if (!unit.order.includes('bottom')) {
          unit.order.push('bottom');
        }
      }
    }
  }

  manualKeyUp(unit: Unit, key: 'w' | 'a' | 's' | 'd') {
    if (key.match(/[wsad]/)) {
      if (key === 'w') {
        unit.joystick.w = false;
        unit.order.splice(unit.order.indexOf('top'), 1);
      }
      if (key === 's') {
        unit.joystick.s = false;
        unit.order.splice(unit.order.indexOf('bottom'), 1);
      }
      if (key === 'a') {
        unit.joystick.a = false;
        unit.order.splice(unit.order.indexOf('left'), 1);
      }
      if (key === 'd') {
        unit.joystick.d = false;
        unit.order.splice(unit.order.indexOf('right'), 1);
      }
      const lastKey = unit.order.at(-1);
      if (lastKey) {
        switch (lastKey) {
          case 'top': {
            unit.gaze = 'top';
            break;
          }
          case 'bottom': {
            unit.gaze = 'bottom';
            break;
          }
          case 'left': {
            unit.gaze = 'left';
            break;
          }
          case 'right': {
            unit.gaze = 'right';
            break;
          }
        }
      }
    }
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
    if (key === ' ') {
      const closeUnit = this.engine.controlUnit?.closeUnit as Npc;
      if (!closeUnit) return;
      console.log(closeUnit);
      const question = closeUnit.startConversation();
      this.engine.ui.conversation(question);
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
