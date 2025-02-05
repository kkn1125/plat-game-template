import { Character3Sprites } from "@/source/sprites";
import QuestNpc from "@model/unit/npc/QuestNpc";
import { ForestRoad1 } from "@store/maps";
import { UnitState } from "@variable/constant";

export const Druid = new QuestNpc("나무꾼 드루이드", {
  hp: Infinity,
  mp: Infinity,
});
let dir = true;
Druid.setSprites(Character3Sprites);
Druid.setLocation(ForestRoad1);
Druid.setPositionByField(-3, -2.5); // Druid.position.x = 100;
Druid.unitColor = "green";
let originPosition = { ...Druid.position };
let state = "Idle";

setInterval(() => {
  const zeroBack = Math.floor(Math.random() * (100 + 1));
  // console.log(state, zeroBack);
  if (zeroBack < 200) {
    state = "Move";
  }
}, 2000);
Druid.chatting.addComment(
  "어휴 이걸 언제 다 해...",
  "3년만 굴러보라더니 이게 몇년 째야.",
  "아무도 없겠지?"
);
Druid.question.addQuestion(
  "아! 놀래라..",
  "나는 히노키의 제자 드루이드야. 혹시 히노키를 만났어?",
  "나에 대해 물으면 열심히 나무 하고 있다고 전해줘! 알았지?"
);
Druid.routine = (unit) => {
  const { x } = unit.position;
  const { x: originX } = originPosition;
  const distance = Math.abs(x - originX);
  if (distance >= 150) {
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
