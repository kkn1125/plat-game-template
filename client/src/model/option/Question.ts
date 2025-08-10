import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import { QuestionState } from '@variable/constant';
import Npc from '../unit/npc/Npc';

export default class Question {
  id = makeId("question");
  
  logger = new Logger<Question>(this);
  npc!: Npc;

  scripts: string[] = [];
  index: number = 0;

  state: QuestionState = QuestionState.Idle;

  constructor(npc: Npc, ...scripts: string[]) {
    this.npc = npc;
    this.scripts = scripts;
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
