import Logger from '@util/Logger';
import Npc from '../npc/Npc';

export default class Question {
  logger = new Logger<Question>(this);
  npc!: Npc;

  scripts: string[] = [];
  index: number = 0;

  constructor(npc: Npc) {
    this.npc = npc;
  }

  addQuestion(...scripts: string[]) {
    this.scripts.push(...scripts);
  }

  get current() {
    return this.scripts[this.index];
  }

  next() {
    this.index = (this.index + 1) % this.scripts.length;
    return this.index !== this.scripts.length - 1;
  }

  start() {
    this.logger.scope('Start').debug('스크립트 시작');
  }
}
