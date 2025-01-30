import GameEngine from "@core/GameEngine";
import { Monster, Npc, Unit } from "@model/unit";
import Building from "@model/unit/building/Building";
import Portal from "@model/unit/portal/Portal";
import { GameMode } from "@variable/constant";
import { isBlockedAll, isBlockedMove } from "@variable/globalControl";
import { makeAutoObservable } from "mobx";

export default class JoystickEvent {
  engine: GameEngine;
  joystick: {
    w: boolean;
    a: boolean;
    d: boolean;
    s: boolean;
    space: boolean;
    i: boolean;
    q: boolean;
  } = {
    w: false,
    a: false,
    d: false,
    s: false,
    space: false,
    i: false,
    q: false,
  };
  order: Gaze[] = [];

  constructor(engine: GameEngine) {
    this.engine = engine;
    makeAutoObservable(this);
  }

  get controlUnit() {
    return this.engine.controlUnit;
  }

  manualKeyDown(unit: Unit, key: "w" | "a" | "s" | "d") {
    if (key === "w") {
      if (!this.joystick.w) {
        unit.gaze = "top";
        if (!unit.order.includes("top")) {
          unit.order.push("top");
        }
      }
    }
    if (key === "a") {
      if (!this.joystick.a) {
        unit.gaze = "left";
        if (!unit.order.includes("left")) {
          unit.order.push("left");
        }
      }
    }
    if (key === "d") {
      if (!this.joystick.d) {
        unit.gaze = "right";
        if (!unit.order.includes("right")) {
          unit.order.push("right");
        }
      }
    }
    if (key === "s") {
      if (!this.joystick.s) {
        unit.gaze = "bottom";
        if (!unit.order.includes("bottom")) {
          unit.order.push("bottom");
        }
      }
    }
  }

  manualKeyUp(unit: Unit, key: "w" | "a" | "s" | "d") {
    if (key.match(/[wsad]/)) {
      if (key === "w") {
        unit.joystick.w = false;
        unit.order.splice(unit.order.indexOf("top"), 1);
      }
      if (key === "s") {
        unit.joystick.s = false;
        unit.order.splice(unit.order.indexOf("bottom"), 1);
      }
      if (key === "a") {
        unit.joystick.a = false;
        unit.order.splice(unit.order.indexOf("left"), 1);
      }
      if (key === "d") {
        unit.joystick.d = false;
        unit.order.splice(unit.order.indexOf("right"), 1);
      }
      const lastKey = unit.order.at(-1);
      if (lastKey) {
        switch (lastKey) {
          case "top": {
            unit.gaze = "top";
            break;
          }
          case "bottom": {
            unit.gaze = "bottom";
            break;
          }
          case "left": {
            unit.gaze = "left";
            break;
          }
          case "right": {
            unit.gaze = "right";
            break;
          }
        }
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.controlUnit) return;

    const key = e.key;

    if (!isBlockedMove()) {
      if (key === "w") {
        if (!this.joystick.w) {
          this.joystick.w = true;
          this.controlUnit.gaze = "top";
          if (!this.order.includes("top")) {
            this.order.push("top");
          }
        }
      }
      if (key === "a") {
        if (!this.joystick.a) {
          this.joystick.a = true;
          this.controlUnit.gaze = "left";
          if (!this.order.includes("left")) {
            this.order.push("left");
          }
        }
      }
      if (key === "d") {
        if (!this.joystick.d) {
          this.joystick.d = true;
          this.controlUnit.gaze = "right";
          if (!this.order.includes("right")) {
            this.order.push("right");
          }
        }
      }
      if (key === "s") {
        if (!this.joystick.s) {
          this.joystick.s = true;
          this.controlUnit.gaze = "bottom";
          if (!this.order.includes("bottom")) {
            this.order.push("bottom");
          }
        }
      }
    }

    // if (key === 'i') {
    //   if (this.joystick.i) {
    //     this.engine.ui.closeInventory();
    //   } else {
    //     this.engine.ui.openInventory();
    //   }
    //   this.joystick.i = !this.joystick.i;
    // }
    if (key === " ") {
      if (isBlockedAll()) return;
      if (this.joystick.space) return;
      e.preventDefault();

      this.joystick.space = true;
      const controlUnit = this.engine.controlUnit;
      if (!controlUnit) return;

      const closeUnit = controlUnit.closeUnit as Unit;
      if (!closeUnit) return;

      if (closeUnit instanceof Building) {
        if (closeUnit.forward) {
          this.engine.gameMapManager.changeMap(closeUnit.forwardMap);
          closeUnit.forward(controlUnit);
          controlUnit.aroundUnits = [];
          this.clearMove();
          if (this.engine.gameMode === GameMode.Multiple) {
            this.engine.socket?.send({
              type: "forward",
              mapName: this.engine.gameMapManager.currentMap?.name || "",
              x: controlUnit.position.x,
              y: controlUnit.position.y,
            });
          }
        }
      } else if (closeUnit instanceof Portal) {
        if (closeUnit.forward) {
          this.engine.gameMapManager.changeMap(closeUnit.forwardMap);
          closeUnit.forward(controlUnit);
          controlUnit.aroundUnits = [];
          this.clearMove();
          if (this.engine.gameMode === GameMode.Multiple) {
            this.engine.socket?.send({
              type: "forward",
              mapName: this.engine.gameMapManager.currentMap?.name || "",
              x: controlUnit.position.x,
              y: controlUnit.position.y,
            });
          }
        }
      } else if (closeUnit instanceof Npc) {
        // if (closeUnit.question.state === QuestionState.Idle) {
        //   const question = closeUnit.startConversation();
        //   this.engine.ui.conversation(question);
        //   this.clearMove();
        // } else {
        //   this.engine.eventManager.emit("conversationNext");
        // }
      } else if (closeUnit instanceof Monster) {
        if (controlUnit.equipment.weapon) {
          console.log("공격중");
          controlUnit.equipment.weapon.attack(closeUnit);
        } else {
          controlUnit.attack(closeUnit);
        }
        if (closeUnit.isDead) {
          this.engine.removeUnit(closeUnit);
          // if (this.joystick.i) {
          //   this.engine.ui.updateInventory();
          // }
        }
      }
    }

    if (key === "Escape") {
      this.engine.eventManager.emit("conversationCancel");
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (!this.controlUnit) return;
    const key = e.key;
    if (key === " ") {
      e.preventDefault();
      this.joystick.space = false;
    }
    if (key.match(/[wsad]/)) {
      if (key === "w") {
        this.joystick.w = false;
        this.order.splice(this.order.indexOf("top"), 1);
        if (this.engine.gameMode === GameMode.Multiple) {
          this.engine.socket?.send({ type: "stop", g: 0 });
        }
        // console.log('top');
      }
      if (key === "s") {
        this.joystick.s = false;
        this.order.splice(this.order.indexOf("bottom"), 1);
        if (this.engine.gameMode === GameMode.Multiple) {
          this.engine.socket?.send({ type: "stop", g: 1 });
        }
        // console.log('bottom');
      }
      if (key === "a") {
        this.joystick.a = false;
        this.order.splice(this.order.indexOf("left"), 1);
        if (this.engine.gameMode === GameMode.Multiple) {
          this.engine.socket?.send({ type: "stop", g: 2 });
        }
        // console.log('left');
      }
      if (key === "d") {
        this.joystick.d = false;
        this.order.splice(this.order.indexOf("right"), 1);
        if (this.engine.gameMode === GameMode.Multiple) {
          this.engine.socket?.send({ type: "stop", g: 3 });
        }
        // console.log('right');
      }
      const lastKey = this.order.at(-1);
      if (lastKey) {
        switch (lastKey) {
          case "top": {
            this.controlUnit.gaze = "top";
            if (this.engine.gameMode === GameMode.Multiple) {
              this.engine.socket?.send({ type: "stop", g: 0 });
            }
            break;
          }
          case "bottom": {
            this.controlUnit.gaze = "bottom";
            if (this.engine.gameMode === GameMode.Multiple) {
              this.engine.socket?.send({ type: "stop", g: 1 });
            }
            break;
          }
          case "left": {
            this.controlUnit.gaze = "left";
            if (this.engine.gameMode === GameMode.Multiple) {
              this.engine.socket?.send({ type: "stop", g: 2 });
            }
            break;
          }
          case "right": {
            this.controlUnit.gaze = "right";
            if (this.engine.gameMode === GameMode.Multiple) {
              this.engine.socket?.send({ type: "stop", g: 3 });
            }
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

  clearMove() {
    this.joystick.w = false;
    this.joystick.s = false;
    this.joystick.a = false;
    this.joystick.d = false;
  }

  run() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }
}
