import { Npc } from '@model/unit';

export const MD = new Npc('MD', {
  hp: Infinity,
  mp: Infinity,
});
MD.setPosition(-150, -270); // MD.position.x = 100;
MD.unitColor = 'green';
