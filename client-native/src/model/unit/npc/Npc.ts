import { makeId } from '@util/makeId';
import { UnitState } from '@variable/constant';
import { addConstraint, deleteConstraint } from '@variable/globalControl';
import AutoMoveable from '../implement/AutoMoveable';
import Question from '../../option/Question';
import Unit from '../Unit';
import Quest from '@model/option/Quest';
import Chatting from '@model/option/Chatting';
import GAME_CONF from '@config/game.conf';

export default class Npc extends Unit implements AutoMoveable {
  routine!: (unit: Unit) => void;
  
  chatting = new Chatting()
  question = new Question(this);
  quest: Quest[] = [];

  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.id = makeId('npc');

    this.increaseSpeed = GAME_CONF.NPC_CONF.DEFAULT.INCREASE_SPEED;
  }

  addQuest(quest: Quest) {
    this.quest.push(quest);
  }

  draw(ctx: CanvasRenderingContext2D, labelCtx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void {
    if (!this.boundary) {
      this.autoMove();
    } else {
      this.state = UnitState.Idle;

      const radians = Math.atan2(this.boundary.position.y - this.position.y, this.boundary.position.x - this.position.x);
      const value = parseInt(((radians / Math.PI) * 10 * 18 + 180).toString());

      if (45 >= value || value > 315) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'a');
      }

      if (45 < value && value <= 135) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'w');
      }

      if (135 < value && value <= 225) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'd');
      }

      if (225 < value && value <= 315) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 's');
      }
    }
    super.draw(ctx, labelCtx, { worldAxisX, worldAxisY });
  }

  setRoutine(routine: (unit: Unit) => void) {
    this.routine = routine;
  }

  autoMove() {
    this.routine?.(this);
  }

  /* NPC 기능 */
  startConversation() {
    this.question.start();
    addConstraint('move');
    return this.question;
  }

  endConversation() {
    deleteConstraint('move');
    this.question.end();
  }
}
