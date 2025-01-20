import { Npc } from '@model/unit';
import { UnitState } from '@variable/constant';

export const MD2 = new Npc('MD2', {
  hp: Infinity,
  mp: Infinity,
});
let dir = true;
MD2.setPosition(150, -150);
MD2.unitColor = 'green';
let originPosition = { ...MD2.position };
let state = 'Idle';

setInterval(() => {
  const zeroBack = Math.floor(Math.random() * (100 + 1));
  // console.log(state, zeroBack);
  if (zeroBack < 50) {
    state = 'Move';
  }
}, 2000);
MD2.question.addQuestion('Hello', 'World');
MD2.routine = (unit) => {
  const { x } = unit.position;
  const { x: originX } = originPosition;
  const distance = Math.abs(x - originX);
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
      unit.move(1, 0);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 'd');
      unit.state = UnitState.Move;
    } else {
      unit.move(-1, 0);
      unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 'a');
      unit.state = UnitState.Move;
    }
  }
};
