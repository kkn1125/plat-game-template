import Item from "../unit/object/Item";
import Unit from "../unit/Unit";

export default class Equipment {
  parent: Unit;

  head: Item | null = null;
  hand: Item | null = null;
  ring: Item | null = null;
  weapon: Item | null = null;
  body: Item | null = null;
  pants: Item | null = null;
  foot: Item | null = null;

  constructor(parent: Unit) {
    this.parent = parent;
  }

  equip(item: Item): void {}

  unequip(item: Item): void {}

  drop(item: Item): void {}
}
