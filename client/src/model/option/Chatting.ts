import { makeId } from "@util/makeId";

export default class Chatting {
  id = makeId("chatting");
  comment: (string | string[])[] = [];
  index: number = 0;

  get currentComment() {
    return this.comment[this.index % this.comment.length];
  }

  addComment(...comments: (string | string[])[]) {
    this.comment.push(...comments);
    this.setNextRandom();
  }

  getNext() {
    return this.comment[this.index++ % this.comment.length];
  }

  setNext() {
    this.index++;
  }

  setNextRandom() {
    this.index = Math.floor(Math.random() * this.comment.length);
  }
}
