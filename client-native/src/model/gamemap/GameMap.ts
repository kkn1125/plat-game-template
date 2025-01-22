import { makeId } from '@util/makeId';
import Field from './Field';

export default class GameMap {
  static createMap(fields: string[][], gameMap: GameMap): Field[][] {
    return fields.map((row, y) => row.map((field, x) => new Field(field, gameMap).setPosition(x, y)));
  }

  id = makeId('gamemap');
  name: Maps;

  fields: Field[][] = [];
  defaultSpawnPosition: XY = { x: 0, y: 0 };

  constructor(name: Maps, fields: string[][]) {
    this.name = name;
    this.fields = GameMap.createMap(fields, this);
  }

  setDefaultSpawnPosition(x: number, y: number) {
    this.defaultSpawnPosition = { x, y };
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
