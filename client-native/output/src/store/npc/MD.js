import { Npc } from '@model/unit';
import { Town2 } from '@store/maps';
import { UnitState } from '@variable/constant';
export const MD = new Npc('MD', {
    hp: Infinity,
    mp: Infinity,
});
let dir = true;
let topBottom = true;
MD.setLocation(Town2);
MD.setPositionByField(-3.5, -2.5); // MD.position.x = 100;
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
MD.question.addQuestion('보다 나은 게임을 준비 중입니다.', '어서오세요.');
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
        }
        else {
            unit.move(0, 1);
            unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 's');
            unit.state = UnitState.Move;
        }
    }
};
