import Question from "@model/option/Question";
import QuestNpc from "@model/unit/npc/QuestNpc";
import { TaechoFront } from "@store/maps";
import { CarryQuest } from "@store/quests/CarryQuest";
import { UnitState } from "@variable/constant";
import { Character2Sprites } from "../../source/sprites";

export const GM2 = new QuestNpc("짐꾼 캐리", {
  hp: Infinity,
  mp: Infinity,
});
let dir = true;
GM2.setSprites(Character2Sprites);
GM2.setLocation(TaechoFront);
GM2.setPositionByField(-3.5, -2.5);
GM2.unitColor = "green";
let originPosition = { ...GM2.position };
let state = "Idle";

setInterval(() => {
  const zeroBack = Math.floor(Math.random() * (100 + 1));
  if (zeroBack < 50) {
    state = "Move";
  }
}, 2000);
GM2.chatting.addComment(
  "분명히 여긴데...",
  "물에 빠졌으면 어쩌지..",
  "또 혼나겠네..",
  "이건가?",
  "..."
);
GM2.addQuestion(
  new Question(
    GM2,
    "어디갔지...",
    "어.. 혹시 시간 된다면 나 좀 도와줄래?",
    "중요한 물건을 잃어버렸어. 여기 근처였던거 같은데..."
  )
);
GM2.routine = (unit) => {
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

GM2.addQuest(CarryQuest);
