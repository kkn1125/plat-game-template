import { Gun } from "@store/items/weapon/Gun";
import { makeId } from "@util/makeId";
import Unit from "../Unit";
import UseEquipment from "../implement/UseEquipment";
import { makeAutoObservable, makeObservable } from "mobx";

export default class Player extends Unit implements UseEquipment {
  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.id = makeId("player");

    makeObservable(this);
  }
}
