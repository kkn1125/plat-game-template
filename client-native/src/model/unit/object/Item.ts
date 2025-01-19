import { makeId } from "@util/makeId";
import Stat from "../option/Stat";

export default class Item {
  id = makeId("item");
  name!: string;
  stat: Stat = new Stat(this);

  constructor(name: string) {
    this.name = name;
  }

  info() {
    return this;
  }
}
