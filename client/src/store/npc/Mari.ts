import { Character3Sprites } from "@/source/sprites";
import MarketNpc from "@model/unit/npc/MarketNpc";
import { Taecho } from "@store/maps";

export const Mari = new MarketNpc("잡화상 마리", {
  hp: Infinity,
  mp: Infinity,
});
Mari.setSprites(Character3Sprites);
Mari.setLocation(Taecho);
Mari.setPositionByField(-12.5, -0.5); // Mari.position.x = 100;
Mari.unitColor = "green";
// let originPosition = { ...Mari.position };
// let state = 'Idle';

// setInterval(() => {
//   const zeroBack = Math.floor(Math.random() * (100 + 1));
//   if (zeroBack < 50) {
//     state = 'Move';
//   }
// }, 2000);
Mari.chatting.addComment(
  "처음 보는 얼굴이네?",
  "언제 가게를 지을건지 원...",
  ["히노키 양반, 나무를 키워서 오나?", "왜 이렇게 늦는 거야."],
  "무기 빼고 다 팝니다~"
);
Mari.question.addQuestion(
  "처음 보는 얼굴이네? 나는 마리라고 해. 이 마을에서 잡화상을 하고 있어.",
  "아직 가게가 준비 안되서 보여줄 물건이 없네.",
  "다음에 오면 내가 좋은 포션 하나 서비스로 줄게!",
  "친구들도 데려오면 더 좋구!"
);
// Mari.routine = (unit) => {
//   const { x } = unit.position;
//   const { x: originX } = originPosition;
//   const distance = Math.abs(x - originX);
//   if (distance >= 50) {
//     dir = !dir;
//     state = 'Idle';
//     originPosition = { ...unit.position };
//     unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 'a');
//     unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 'd');
//     // unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 's');
//     unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 'w');
//     unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 's');
//     unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 's');
//     unit.state = UnitState.Idle;
//   }
//   if (state === 'Move') {
//     if (dir) {
//       unit.move(-unit.increaseSpeed, 0);
//       unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 'a');
//       unit.state = UnitState.Move;
//     } else {
//       unit.move(unit.increaseSpeed, 0);
//       unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 'd');
//       unit.state = UnitState.Move;
//     }
//   }
// };
