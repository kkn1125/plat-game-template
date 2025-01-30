import { ItemType } from "@variable/constant";
import Item from "../unit/object/Item";
import Unit from "../unit/Unit";
import { makeAutoObservable } from "mobx";
import ItemWeapon from "@model/unit/object/ItemWeapon";

export default class Equipment {
  parent: Unit;

  head: Item | null = null;
  hand: Item | null = null;
  ring: Item | null = null;
  weapon: ItemWeapon | null = null;
  body: Item | null = null;
  pants: Item | null = null;
  foot: Item | null = null;

  constructor(parent: Unit) {
    this.parent = parent;
    makeAutoObservable(this);
  }

  get totalStr() {
    let str = 0;
    if (this.head) {
      str += this.head.stat.str;
    }
    if (this.hand) {
      str += this.hand.stat.str;
    }
    if (this.ring) {
      str += this.ring.stat.str;
    }
    if (this.weapon) {
      str += this.weapon.stat.str;
    }
    if (this.body) {
      str += this.body.stat.str;
    }
    if (this.pants) {
      str += this.pants.stat.str;
    }
    if (this.foot) {
      str += this.foot.stat.str;
    }
    return str;
  }

  get totalDex() {
    let dex = 0;
    if (this.head) {
      dex += this.head.stat.dex;
    }
    if (this.hand) {
      dex += this.hand.stat.dex;
    }
    if (this.ring) {
      dex += this.ring.stat.dex;
    }
    if (this.weapon) {
      dex += this.weapon.stat.dex;
    }
    if (this.body) {
      dex += this.body.stat.dex;
    }
    if (this.pants) {
      dex += this.pants.stat.dex;
    }
    if (this.foot) {
      dex += this.foot.stat.dex;
    }
    return dex;
  }

  get totalInt() {
    let int = 0;
    if (this.head) {
      int += this.head.stat.int;
    }
    if (this.hand) {
      int += this.hand.stat.int;
    }
    if (this.ring) {
      int += this.ring.stat.int;
    }
    if (this.weapon) {
      int += this.weapon.stat.int;
    }
    if (this.body) {
      int += this.body.stat.int;
    }
    if (this.pants) {
      int += this.pants.stat.int;
    }
    if (this.foot) {
      int += this.foot.stat.int;
    }
    return int;
  }

  get totalLuk() {
    let luk = 0;
    if (this.head) {
      luk += this.head.stat.luk;
    }
    if (this.hand) {
      luk += this.hand.stat.luk;
    }
    if (this.ring) {
      luk += this.ring.stat.luk;
    }
    if (this.weapon) {
      luk += this.weapon.stat.luk;
    }
    if (this.body) {
      luk += this.body.stat.luk;
    }
    if (this.pants) {
      luk += this.pants.stat.luk;
    }
    if (this.foot) {
      luk += this.foot.stat.luk;
    }
    return luk;
  }

  equip(item: Item): void {
    switch (item.type) {
      case ItemType.Head:
        this.head = item;
        break;
      case ItemType.Hand:
        this.hand = item;
        break;
      case ItemType.Ring:
        this.ring = item;
        break;
      case ItemType.Weapon:
        this.weapon = item as ItemWeapon;
        break;
      case ItemType.Body:
        this.body = item;
        break;
      case ItemType.Pants:
        this.pants = item;
        break;
      case ItemType.Foot:
        this.foot = item;
        break;
      default:
        return;
    }
  }

  unequip(item: Item): void {
    switch (item.type) {
      case ItemType.Head:
        this.head = null;
        this.parent.inventory.addItem(item);
        break;
      case ItemType.Hand:
        this.hand = null;
        this.parent.inventory.addItem(item);
        break;
      case ItemType.Ring:
        this.ring = null;
        this.parent.inventory.addItem(item);
        break;
      case ItemType.Weapon:
        this.weapon = null;
        this.parent.inventory.addItem(item);
        break;
      case ItemType.Body:
        this.body = null;
        this.parent.inventory.addItem(item);
        break;
      case ItemType.Pants:
        this.pants = null;
        this.parent.inventory.addItem(item);
        break;
      case ItemType.Foot:
        this.foot = null;
        this.parent.inventory.addItem(item);
        break;
      default:
        return;
    }
  }

  drop(item: Item): void {}
}
