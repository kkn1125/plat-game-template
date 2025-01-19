import { Unit } from '@model/unit';
import { makeId } from '@util/makeId';
import Field from './Field';

export default class GameMap {
  static createMap(fields: string[][]): Field[][] {
    return fields.map((row, y) => row.map((field, x) => new Field(field).setPosition(x, y)));
  }

  id = makeId('gamemap');
  name: string;

  fields: Field[][] = [];

  constructor(name: string, fields: string[][]) {
    this.name = name;
    this.fields = GameMap.createMap(fields);
  }

  forward(unit: Unit) {}

  draw(ctx: CanvasRenderingContext2D, worldAxis: WorldAxis) {
    for (const row of this.fields) {
      for (const field of row) {
        field.draw(ctx, worldAxis);
      }
    }
  }
}
