import { makeId } from "@util/makeId";
export default class Location {
    constructor(locate) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: makeId("location")
        });
        Object.defineProperty(this, "locate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.locate = locate;
    }
}
