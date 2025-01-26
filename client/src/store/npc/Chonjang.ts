import { Npc } from "@model/unit";
import { MDHouse, Taecho } from "@store/maps";
import { UnitState } from "@variable/constant";

export const Chonjang = new Npc("촌장", {
  hp: Infinity,
  mp: Infinity,
});
let dir = true;
Chonjang.setLocation(MDHouse);
Chonjang.setPositionByField(0, -1); // Chonjang.position.x = 100;
Chonjang.unitColor = "green";
let originPosition = { ...Chonjang.position };
let state = "Idle";

setInterval(() => {
  const zeroBack = Math.floor(Math.random() * (100 + 1));
  // console.log(state, zeroBack);
  if (zeroBack < 50) {
    state = "Move";
  }
}, 2000);
Chonjang.chatting.addComment("어서오세요.");
Chonjang.question.addQuestion(
  "에구구... 삭신이야..",
  "마침 잘 왔네. 정말 중요한 일이 생겨서 말이지..!",
  "...",
  "전구 좀 갈아주겠나? 홀홀",
  "(...나중에 다시오자)"
);
Chonjang.routine = (unit) => {
  const { x } = unit.position;
  const { x: originX } = originPosition;
  const distance = Math.abs(x - originX);
  if (distance >= 50) {
    dir = !dir;
    state = "Idle";
    originPosition = { ...unit.position };
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, "a");
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, "d");
    // unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 's');
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, "w");
    unit.engine.eventManager.joystickEvent.manualKeyDown(unit, "s");
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, "s");
    unit.state = UnitState.Idle;
  }
  if (state === "Move") {
    if (dir) {
      unit.move(-unit.increaseSpeed, 0);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, "a");
      unit.state = UnitState.Move;
    } else {
      unit.move(unit.increaseSpeed, 0);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, "d");
      unit.state = UnitState.Move;
    }
  }
};
