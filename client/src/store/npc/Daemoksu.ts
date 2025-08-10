import { Character4Sprites } from "@/source/sprites";
import Question from "@model/option/Question";
import QuestNpc from "@model/unit/npc/QuestNpc";
import { Taecho } from "@store/maps";
import { DaemoksuQuest } from "@store/quests/DaemoksuQuest";
import { UnitState } from "@variable/constant";

export const Daemoksu = new QuestNpc("대목수 히노키", {
  hp: Infinity,
  mp: Infinity,
});
let dir = true;
Daemoksu.setSprites(Character4Sprites);
Daemoksu.setLocation(Taecho);
Daemoksu.setPositionByField(12, -0.5); // Daemoksu.position.x = 100;
Daemoksu.unitColor = "green";
let originPosition = { ...Daemoksu.position };
let state = "Idle";

setInterval(() => {
  const zeroBack = Math.floor(Math.random() * (100 + 1));
  // console.log(state, zeroBack);
  if (zeroBack < 50) {
    state = "Move";
  }
}, 2000);
Daemoksu.chatting.addComment(
  "힘 좀 써보라고! 그것 밖에 안돼?!",
  "내 밑에서 3년만 굴러봐!",
  "아니 옆에다 놓으라고! 몇 번을 말해!"
);
Daemoksu.addQuestion(
  new Question(
    Daemoksu,
    "뭐야 못 보던 얼굴인데? 모험가 양반이신가?",
    "나는 대목수 히노키야. 이 마을에서 제일 가는 대목수지.",
    "집 짓는 일이 아니라면 나중에 다시 오도록.",
    "모험가 양반, 혹시 숲길에서 나무꾼 하나 못 봤어? 만약 놀고 있으면 내가 거꾸로 심어버린다고 전해주게."
  )
);
Daemoksu.routine = (unit) => {
  const { x } = unit.position;
  const { x: originX } = originPosition;
  const distance = Math.abs(x - originX);
  if (distance >= 100) {
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

/* quest */
Daemoksu.addQuest(DaemoksuQuest);
