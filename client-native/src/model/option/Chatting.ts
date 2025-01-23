import { makeId } from '@util/makeId';

export default class Chatting {
  id = makeId('chatting');
  comment: string[] = [];
  index: number = 0;

  addComment(...comments: string[]) {
    this.comment.push(...comments);
  }

  getNext() {
    return this.comment[this.index++ % this.comment.length];
  }
}
