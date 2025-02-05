import { Npc } from "@model/unit";
import { Taecho } from "@store/maps";
import { UnitState } from "@variable/constant";

export const GM = new Npc("GM - DEVKIMSON", {
  hp: Infinity,
  mp: Infinity,
});
let dir = true;
GM.setLocation(Taecho);
GM.setPositionByField(1.5, -0.5); // GM.position.x = 100;
GM.unitColor = "green";
let originPosition = { ...GM.position };
let state = "Idle";

setInterval(() => {
  const zeroBack = Math.floor(Math.random() * (100 + 1));
  // console.log(state, zeroBack);
  if (zeroBack < 50) {
    state = "Move";
  }
}, 2000);
GM.chatting.addComment(
  "✨말풍선 기능 추가!✨",
  "안녕하세요. GM입니다.",
  "곧 상점과 퀘스트 기능이 추가됩니다.",
  ["개발자의 집을 찾으시면 블로그로", "이동할 수 있습니다!"],
  "미니맵은 m키를 눌러 켜고 끌 수 있습니다.",
  "인벤토리 창은 i 키를 눌러주세요.",
  "장비/상태 창은 e 키를 눌러주세요.",
  ["아이템 착용은 인벤토리 창에서", "아이템을 좌클릭하면 착용됩니다."],
  [
    "장비/상태 창에서 착용 아이템을 좌클릭하면 해제되며",
    "인벤토리로 이동합니다.",
  ]
);
GM.question.addQuestion(
  "초기 버전의 게임보다 나은 환경을 조성 중 입니다.",
  "다양한 오브젝트와 유닛의 상호작용이 다양해졌어요!",
  "퀘스트와 상점 기능이 개발되고 있어요.",
  "자세한 업데이트 내역은 추후 공지사항 컨텐츠가 개발되면 볼 수 있어요!"
);
GM.routine = (unit) => {
  const { y } = unit.position;
  const { y: originY } = originPosition;
  const distance = Math.abs(y - originY);
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
      unit.move(0, -unit.increaseSpeed);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, "w");
      unit.state = UnitState.Move;
    } else {
      unit.move(0, unit.increaseSpeed);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, "s");
      unit.state = UnitState.Move;
    }
  }
};
