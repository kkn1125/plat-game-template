import { makeId } from '@util/makeId';
import { UnitState } from '@variable/constant';
import { addConstraint, deleteConstraint } from '@variable/globalControl';
import Question from '../../option/Question';
import Unit from '../Unit';
export default class Npc extends Unit {
    constructor(name, option) {
        super(name, option);
        Object.defineProperty(this, "routine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "quest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "question", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Question(this)
        });
        this.id = makeId('npc');
    }
    addQuest(quest) {
        this.quest.push(quest);
    }
    draw(ctx, labelCtx, { worldAxisX, worldAxisY }) {
        if (!this.boundary) {
            this.autoMove();
        }
        else {
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
    setRoutine(routine) {
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
