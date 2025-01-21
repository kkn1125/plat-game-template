import Logger from '@util/Logger';
import Npc from '../npc/Npc';
import { QuestionState, UnitState } from '@variable/constant';

export default class Question {
  logger = new Logger<Question>(this);
  npc!: Npc;

  scripts: string[] = [];
  index: number = 0;

  state: QuestionState = QuestionState.Idle;

  constructor(npc: Npc) {
    this.npc = npc;
  }

  addQuestion(...scripts: string[]) {
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
