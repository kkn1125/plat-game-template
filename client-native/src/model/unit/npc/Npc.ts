import GAME_CONF from '@config/game.conf';
import AutoMoveable from '../implement/AutoMoveable';
import Question from '../option/Question';
import Unit from '../Unit';
import { UnitState } from '@variable/constant';

export default class Npc extends Unit implements AutoMoveable {
  routine!: (unit: Unit) => void;

  draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void {
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
    super.draw(ctx, { worldAxisX, worldAxisY });
  }

  setRoutine(routine: (unit: Unit) => void) {
    this.routine = routine;
  }

  autoMove() {
    this.routine?.(this);
  }

  question = new Question(this);

  /* NPC 기능 */
  startConversation() {
    return this.question;
  }
}
