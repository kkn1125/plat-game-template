import { makeId } from "@util/makeId";
import { makeObservable } from "mobx";
import Unit from "../Unit";
import UseEquipment from "../implement/UseEquipment";

export default class Player extends Unit implements UseEquipment {
  // questMap: WeakMap<
  //   Quest,
  //   {
  //     status: "pending" | "accepted" | "completed";
  //     process: number;
  //   }
  // > = new WeakMap();

  questRealMap: Map<string, QuestRealMap> = new Map();

  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.id = makeId("player");

    makeObservable(this);
  }
}
