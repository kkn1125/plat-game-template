import { makeObservable } from "mobx";
import Monster from "./Monster";

export default class FlyMonster extends Monster {
  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.passable = true;
    makeObservable(this);
  }
}
