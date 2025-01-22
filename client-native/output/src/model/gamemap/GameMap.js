import { makeId } from '@util/makeId';
import Field from './Field';
import GAME_CONF from '@config/game.conf';
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
        Object.defineProperty(this, "forwardedPosition", {
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
    setDefaultSpawnPositionByField(indexX, indexY) {
        const x = indexX * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
        const y = indexY * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
        this.defaultSpawnPosition = { x, y };
    }
    setForwardedPosition(x, y) {
        // console.log(this.name, x, y);
        this.forwardedPosition = { x, y };
    }
    setForwardedPositionByField(indexX, indexY) {
        const x = indexX * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
        const y = indexY * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
        this.forwardedPosition = { x, y };
    }
    // setForwardedPositionByPortal(portal: Portal) {
    //   this.forwardedPosition = { ...portal.position };
    // }
    setForwardedDirection(direction) {
        if (direction === 'top') {
            this.forwardedPosition.y -= 1;
        }
        else if (direction === 'bottom') {
            this.forwardedPosition.y += 1;
        }
        else if (direction === 'left') {
            this.forwardedPosition.x -= 1;
        }
        else if (direction === 'right') {
            this.forwardedPosition.x += 1;
        }
    }
    drawMap(ctx, worldAxis) {
        for (const row of this.fields) {
            for (const field of row) {
                field.drawMap(ctx, worldAxis);
            }
        }
    }
    drawObject(ctx, worldAxis, emboss) {
        for (const row of this.fields) {
            for (const field of row) {
                field.drawObject(ctx, worldAxis, emboss);
            }
        }
    }
}
