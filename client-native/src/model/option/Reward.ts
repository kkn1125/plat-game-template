import Item from '@model/unit/object/Item';

export default class Reward {
  exp: number = 0;
  gold: number = 0;
  item: Item | null = null;

  constructor() {}

  setItem(item: Item) {
    this.item = item;
  }

  setExp(exp: number): void {
    this.exp = exp;
  }

  setGold(gold: number): void {
    this.gold = gold;
  }

  getExp(): number {
    return this.exp;
  }

  getGold(): number {
    return this.gold;
  }

  getItem(): Item | null {
    return this.item;
  }
}
