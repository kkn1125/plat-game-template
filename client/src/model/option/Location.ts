import { makeId } from "@util/makeId";
import { makeAutoObservable } from "mobx";

export default class Location {
  id = makeId("location");

  locate: Maps;

  constructor(locate: Maps) {
    this.locate = locate;
    makeAutoObservable(this);
  }
}
