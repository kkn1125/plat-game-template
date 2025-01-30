import { ItemType } from "@variable/constant";
import Item from "./Item";

export default class ItemWeapon extends Item {
  range: number = 0;

  constructor(name: string) {
    super(name);
    this.type = ItemType.Weapon;
  }
}
