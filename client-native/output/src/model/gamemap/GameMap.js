import { makeId } from '@util/makeId';
import Field from './Field';
export default class GameMap {
    static createMap(fields, gameMap) {
        return fields.map((row, y) => row.map((field, x) => new Field(field, gameMap).setPosition(x, y)));
    }
    constructor(name, fields) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: makeId('gamemap')
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "defaultSpawnPosition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { x: 0, y: 0 }
        });
        this.name = name;
        this.fields = GameMap.createMap(fields, this);
    }
    setDefaultSpawnPosition(x, y) {
        this.defaultSpawnPosition = { x, y };
    }
    draw(ctx, worldAxis) {
        for (const row of this.fields) {
            for (const field of row) {
                field.draw(ctx, worldAxis);
            }
        }
    }
}
