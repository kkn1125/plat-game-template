import GAME_CONF from "@config/game.conf";
import { Unit } from "@model/unit";
import Item from "@model/unit/object/Item";
import { makeAutoObservable } from "mobx";

export default class Inventory {
  unit: Unit;

  slots: (Item | null)[][] = Array.from(
    Array(GAME_CONF.UNIT_CONF.DEFAULT.INVENTORY.Y),
    () => Array.from(Array(GAME_CONF.UNIT_CONF.DEFAULT.INVENTORY.X), () => null)
  );

  constructor(unit: Unit) {
    this.unit = unit;
    makeAutoObservable(this);
  }

  get emptyCellIndex() {
    for (let row = 0; row < this.slots.length; row++) {
      for (let col = 0; col < this.slots[row].length; col++) {
        if (this.slots[row][col] === null) {
          return [col, row];
        }
      }
    }
  }

  addItem(item: Item) {
    const index = this.emptyCellIndex;
    if (index) {
      const [col, row] = index;
      this.slots[row][col] = item;
      item.setUnit(this.unit);
      item.setGameEngine(this.unit.engine);
    }
  }

  findItemById(id: string): Item | null {
    for (const row of this.slots) {
      for (const item of row) {
        if (item?.id === id) {
          return item;
        }
      }
    }
    return null;
  }

  findItemByIndex(x: number, y: number): Item | null {
    return this.slots[y][x];
  }

  pickItem(x: number, y: number) {
    const slotItem = this.slots[y][x];
    if (slotItem) {
      this.slots[y][x] = null;
      return slotItem;
    }
    return null;
  }

  dropItem(x: number, y: number) {
    const slotItem = this.slots[y][x];
    if (slotItem) {
      this.slots[y][x] = null;
      slotItem.dropped = true;
      slotItem.location.locate = this.unit.location.locate;
      slotItem.position.x = this.unit.position.x;
      slotItem.position.y = this.unit.position.y;
      this.unit.engine.addItem(slotItem);
    }
  }

  equipItem(x: number, y: number) {
    const slotItem = this.pickItem(x, y);
    if (!slotItem) return;
    this.unit.equipment.equip(slotItem);
  }
}
