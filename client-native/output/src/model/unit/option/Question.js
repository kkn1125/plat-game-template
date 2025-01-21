import Logger from '@util/Logger';
import { QuestionState } from '@variable/constant';
export default class Question {
    constructor(npc) {
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Logger(this)
        });
        Object.defineProperty(this, "npc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scripts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: QuestionState.Idle
        });
        this.npc = npc;
    }
    addQuestion(...scripts) {
        this.scripts.push(...scripts);
    }
    get current() {
        return this.scripts[this.index];
    }
    *getNext() {
        for (const word of this.scripts) {
            yield word;
        }
    }
    start() {
        this.logger.scope('Start').debug('스크립트 시작');
        this.state = QuestionState.Talk;
    }
    end() {
        this.state = QuestionState.Idle;
    }
    reset() {
        this.index = 0;
        this.scripts = [];
    }
}
