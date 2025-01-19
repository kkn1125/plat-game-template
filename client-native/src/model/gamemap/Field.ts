import GAME_CONF from '@config/game.conf';
import { makeId } from '@util/makeId';

export default class Field {
  id = makeId('field');
  name: string;
  position: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  constructor(name: string) {
    this.name = name;
  }

  setX(x: number) {
    this.position.x = x;
    return this;
  }

  setY(y: number) {
    this.position.y = y;
    return this;
  }

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    return this;
  }

  draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    const { color } = GAME_CONF.MAP_CONF.FIELD_VALIDATE(this);
    ctx.fillStyle = color;
    const { x, y } = this.position;
    const { X, Y } = GAME_CONF.MAP_CONF.DEFAULT.SIZE;
    ctx.fillRect(worldAxisX + x * X, worldAxisY + y * Y, X, Y);
  }
}
