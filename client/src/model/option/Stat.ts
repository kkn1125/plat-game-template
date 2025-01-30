import GAME_CONF from "@config/game.conf";
import { makeAutoObservable } from "mobx";
import Unit from "../unit/Unit";
import Item from "../unit/object/Item";

type StatKey = Extract<keyof Stat, "str" | "dex" | "int" | "luk">;

export default class Stat {
  static readonly DefaultPoint = 5;
  parent: Unit | Item;

  statPoint: number = 0;
  str: number = GAME_CONF.UNIT_CONF.DEFAULT.STR;
  dex: number = GAME_CONF.UNIT_CONF.DEFAULT.DEX;
  int: number = GAME_CONF.UNIT_CONF.DEFAULT.INT;
  luk: number = GAME_CONF.UNIT_CONF.DEFAULT.LUCK;

  constructor(parent: Unit | Item) {
    this.parent = parent;
    makeAutoObservable(this);
  }

  get damage(): number {
    return this.str + this.dex;
  }

  increaseStatPoint(): void {
    // 불변값으로 추가 (에러 가능성을 고려하여 인자 제거)
    this.statPoint += Stat.DefaultPoint;
  }

  statUp(state: StatKey, amount: number): void {
    if (this.statPoint > 0) {
      this[state] += amount;
      this.statPoint -= 1;
    }
  }

  statClear(): void {
    this.str = GAME_CONF.UNIT_CONF.DEFAULT.STR;
    this.dex = GAME_CONF.UNIT_CONF.DEFAULT.DEX;
    this.int = GAME_CONF.UNIT_CONF.DEFAULT.INT;
    this.luk = GAME_CONF.UNIT_CONF.DEFAULT.LUCK;
  }
}
