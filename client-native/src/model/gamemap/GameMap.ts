import { makeId } from '@util/makeId';
import Field from './Field';
import GAME_CONF from '@config/game.conf';
import Portal from '@model/unit/portal/Portal';

export default class GameMap {
  static createMap(fields: string[][], gameMap: GameMap): Field[][] {
    return fields.map((row, y) => row.map((field, x) => new Field(field, gameMap).setPosition(x, y)));
  }

  id = makeId('gamemap');
  name: Maps;

  fields: Field[][] = [];
  defaultSpawnPosition: XY = { x: 0, y: 0 };
  forwardedPosition: XY = { x: 0, y: 0 };

  constructor(name: Maps, fields: string[][]) {
    this.name = name;
    this.fields = GameMap.createMap(fields, this);
  }

  setDefaultSpawnPosition(x: number, y: number) {
    this.defaultSpawnPosition = { x, y };
  }

  setDefaultSpawnPositionByField(indexX: number, indexY: number) {
    const x = indexX * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    const y = indexY * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
    this.defaultSpawnPosition = { x, y };
  }

  setForwardedPosition(x: number, y: number) {
    // console.log(this.name, x, y);
    this.forwardedPosition = { x, y };
  }

  setForwardedPositionByField(indexX: number, indexY: number) {
    const x = indexX * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    const y = indexY * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
    this.forwardedPosition = { x, y };
  }

  // setForwardedPositionByPortal(portal: Portal) {
  //   this.forwardedPosition = { ...portal.position };
  // }

  setForwardedDirection(direction: 'top' | 'bottom' | 'left' | 'right') {
    if (direction === 'top') {
      this.forwardedPosition.y -= 1;
    } else if (direction === 'bottom') {
      this.forwardedPosition.y += 1;
    } else if (direction === 'left') {
      this.forwardedPosition.x -= 1;
    } else if (direction === 'right') {
      this.forwardedPosition.x += 1;
    }
  }

  drawMap(ctx: CanvasRenderingContext2D, worldAxis: WorldAxis) {
    for (const row of this.fields) {
      for (const field of row) {
        field.drawMap(ctx, worldAxis);
      }
    }
  }
  drawObject(ctx: CanvasRenderingContext2D, worldAxis: WorldAxis, emboss?: boolean) {
    for (const row of this.fields) {
      for (const field of row) {
        field.drawObject(ctx, worldAxis, emboss);
      }
    }
  }
}
