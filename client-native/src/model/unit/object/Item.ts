import { makeId } from '@util/makeId';
import Stat from '../option/Stat';

export default class Item {
  id = makeId('item');
  name!: string;
  stat: Stat = new Stat(this);
  position: XY = {
    x: 0,
    y: 0,
  };
  dropped: boolean = false;

  constructor(name: string) {
    this.name = name;
  }

  info() {
    return this;
  }
}
