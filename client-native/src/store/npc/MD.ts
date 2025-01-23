import { Npc } from '@model/unit';
import { Taecho } from '@store/maps';
import { UnitState } from '@variable/constant';

export const MD = new Npc('MD', {
  hp: Infinity,
  mp: Infinity,
});
let dir = true;
MD.setLocation(Taecho);
MD.setPositionByField(1.5, -0.5); // MD.position.x = 100;
MD.unitColor = 'green';
let originPosition = { ...MD.position };
let state = 'Idle';

setInterval(() => {
  const zeroBack = Math.floor(Math.random() * (100 + 1));
  // console.log(state, zeroBack);
  if (zeroBack < 50) {
    state = 'Move';
  }
}, 2000);
MD.chatting.addComment('어서오세요.');
MD.question.addQuestion('초기 버전의 게임보다 나은 환경을 조성 중 입니다.', '다양한 오브젝트와 유닛의 상호작용이 다양해졌어요!', '자세한 업데이트 내역은 추후 공지사항 컨텐츠가 개발되면 볼 수 있어요!');
MD.routine = (unit) => {
  const { y } = unit.position;
  const { y: originY } = originPosition;
  const distance = Math.abs(y - originY);
  if (distance >= 50) {
    dir = !dir;
    state = 'Idle';
    originPosition = { ...unit.position };
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 'a');
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 'd');
    unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 's');
    unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 's');
    unit.state = UnitState.Idle;
  }
  if (state === 'Move') {
    if (dir) {
      unit.move(0, -1);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 'w');
      unit.state = UnitState.Move;
    } else {
      unit.move(0, 1);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 's');
      unit.state = UnitState.Move;
    }
  }
};
