import { makeId } from '@util/makeId';
import Stat from '../../option/Stat';
export default class Item {
    constructor(name) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: makeId('item')
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Stat(this)
        });
        Object.defineProperty(this, "position", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                x: 0,
                y: 0,
            }
        });
        Object.defineProperty(this, "dropped", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.name = name;
    }
    info() {
        return this;
    }
}
