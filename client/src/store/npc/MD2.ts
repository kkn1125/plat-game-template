import { Npc } from "@model/unit";
import { TaechoFront } from "@store/maps";
import { UnitState } from "@variable/constant";
import { Character2Sprites } from "../../source/sprites";

export const MD2 = new Npc("짐꾼", {
  hp: Infinity,
  mp: Infinity,
});
let dir = true;
MD2.setSprites(Character2Sprites);
MD2.setLocation(TaechoFront);
MD2.setPositionByField(-3.5, -2.5);
MD2.unitColor = "green";
let originPosition = { ...MD2.position };
let state = "Idle";

setInterval(() => {
  const zeroBack = Math.floor(Math.random() * (100 + 1));
  if (zeroBack < 50) {
    state = "Move";
  }
}, 2000);
MD2.question.addQuestion(
  "어디갔지...",
  "어.. 혹시 나 좀 도와줄래?",
  "중요한 물건을 잃어버렸어. 여기 근처였던거 같은데..."
);
MD2.routine = (unit) => {
  const { x } = unit.position;
  const { x: originX } = originPosition;
  const distance = Math.abs(x - originX);
  if (distance >= 50) {
    dir = !dir;
    state = "Idle";
    originPosition = { ...unit.position };
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, "a");
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, "d");
    unit.engine.eventManager.joystickEvent.manualKeyDown(unit, "s");
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, "s");
    unit.state = UnitState.Idle;
  }
  if (state === "Move") {
    if (dir) {
      unit.move(unit.increaseSpeed, 0);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, "d");
      unit.state = UnitState.Move;
    } else {
      unit.move(-unit.increaseSpeed, 0);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, "a");
      unit.state = UnitState.Move;
    }
  }
};
