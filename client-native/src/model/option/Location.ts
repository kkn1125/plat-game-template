import { makeId } from "@util/makeId";

export default class Location {
  id = makeId("location");

  locate: Maps;

  constructor(locate: Maps) {
    this.locate = locate;
  }
}
