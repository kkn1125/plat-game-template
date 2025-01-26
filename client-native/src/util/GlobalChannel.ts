import { Unit } from '@model/unit';
import { v4 } from 'uuid';

export default class Channel {
  name: string;
  userList: Unit[] = [];

  constructor() {
    this.name = v4();
  }

  addUser(user: Unit) {
    this.userList.push(user);
  }

  hasUser(user: Unit) {
    return this.userList.some((item) => item === user);
  }

  removeUser(user: Unit) {
    this.userList = this.userList.filter((item) => item !== user);
  }
}
