import { MapSprites, MapSprites2 } from '@/source/sprites';
import GAME_CONF from '@config/game.conf';
import GameMapManager from '@core/GameMapManager';
import { makeId } from '@util/makeId';
import GameMap from './GameMap';
import { Tile } from '@variable/constant';

export default class Field {
  id = makeId('field');
  name: string;
  position: XY = {
    x: 0,
    y: 0,
  };
  groundLevel: number = 0;
  passable: boolean = true;
  gameMap: GameMap;

  constructor(name: string, gameMap: GameMap) {
    this.name = name;
    this.gameMap = gameMap;
    this.passable = this.isPassable;
  }

  get isPassable() {
    switch (this.name) {
      case Tile.Water:
        return false;
      case Tile.Grass:
        return true;
      case Tile.Road:
        return true;
      default:
        return true;
    }
  }

  getField(x: number, y: number) {
    return this.fields?.[y]?.[x];
  }

  get roundFields() {
    const top = this.getField(this.position.x, this.position.y - 1);
    const topLeft = this.getField(this.position.x - 1, this.position.y - 1);
    const topRight = this.getField(this.position.x + 1, this.position.y - 1);
    const bottom = this.getField(this.position.x, this.position.y + 1);
    const bottomLeft = this.getField(this.position.x - 1, this.position.y + 1);
    const bottomRight = this.getField(this.position.x + 1, this.position.y + 1);
    const left = this.getField(this.position.x - 1, this.position.y);
    const right = this.getField(this.position.x + 1, this.position.y);
    const center = this.getField(this.position.x, this.position.y);
    return {
      top,
      topLeft,
      topRight,
      bottom,
      bottomLeft,
      bottomRight,
      left,
      right,
      center,
    };
  }

  includes(fields: Field[], tile: Tile) {
    return fields.every((field) => field?.name === tile);
  }

  equals(field: Field, tile: Tile) {
    return field?.name === tile;
  }

  validateGrass(): [HTMLImageElement, number, number] {
    const sprites = MapSprites;
    const sprites2 = MapSprites2;
    const { top, topLeft, topRight, bottom, bottomLeft, bottomRight, left, right, center } = this.roundFields;

    let tile: [HTMLImageElement, number, number] = [sprites, 1, 5];

    if (this.includes([center, bottom, right], Tile.Grass) && this.equals(bottomRight, Tile.Water)) {
      // Grass-Water 좌상단
      tile = [sprites2, 4, 6];
    } else if (this.includes([center, bottom, left], Tile.Grass) && this.equals(bottomLeft, Tile.Water)) {
      // Grass-Water 우상단
      tile = [sprites2, 5, 6];
    } else if (this.includes([center, top, right], Tile.Grass) && this.equals(topRight, Tile.Water)) {
      // Grass-Water 좌하단
      tile = [sprites2, 4, 7];
    } else if (this.includes([center, top, left], Tile.Grass) && this.equals(topLeft, Tile.Water)) {
      // Grass-Water 우하단
      tile = [sprites2, 5, 7];
    } else if (this.equals(right, Tile.Grass) && this.equals(left, Tile.Water)) {
      // Grass-Water 좌측
      tile = [sprites2, 4, 1];
    } else if (this.equals(left, Tile.Grass) && this.equals(right, Tile.Water)) {
      // Grass-Water 우측
      tile = [sprites2, 6, 1];
    } else if (this.equals(bottom, Tile.Grass) && this.equals(top, Tile.Water)) {
      // Grass-Water 상단
      tile = [sprites2, 5, 0];
    } else if (this.equals(top, Tile.Grass) && this.equals(bottom, Tile.Water)) {
      // Grass-Water 하단
      tile = [sprites2, 5, 2];
    }

    if (this.includes([top, right, center], Tile.Grass) && this.equals(topRight, Tile.Road)) {
      // Road-Grass 좌하단
      tile = [sprites, 0, 2];
    } else if (this.includes([top, left, center], Tile.Grass) && this.equals(topLeft, Tile.Road)) {
      // Road-Grass 우하단
      tile = [sprites, 2, 2];
    } else if (this.includes([bottom, right, center], Tile.Grass) && this.equals(bottomRight, Tile.Road)) {
      // Road-Grass 좌상단
      tile = [sprites, 0, 0];
    } else if (this.includes([bottom, left, center], Tile.Grass) && this.equals(bottomLeft, Tile.Road)) {
      // Road-Grass 우상단
      tile = [sprites, 2, 0];
    } else if (this.includes([topLeft, top, left], Tile.Road) && this.equals(center, Tile.Grass)) {
      // Grass-Road 좌상단
      tile = [sprites, 0, 4];
    } else if (this.includes([topRight, top, right], Tile.Road) && this.equals(center, Tile.Grass)) {
      // Grass-Road 우상단
      tile = [sprites, 2, 4];
    } else if (this.includes([bottomLeft, bottom, left], Tile.Road) && this.equals(center, Tile.Grass)) {
      // Grass-Road 좌하단
      tile = [sprites, 0, 6];
    } else if (this.includes([bottomRight, bottom, right], Tile.Road) && this.equals(center, Tile.Grass)) {
      // Grass-Road 우하단
      tile = [sprites, 2, 6];
    } else if (this.equals(center, Tile.Grass) && this.equals(left, Tile.Road)) {
      // Grass-Road 좌측
      tile = [sprites, 0, 5];
    } else if (this.equals(center, Tile.Grass) && this.equals(right, Tile.Road)) {
      // Grass-Road 우측
      tile = [sprites, 2, 5];
    } else if (this.equals(center, Tile.Grass) && this.equals(top, Tile.Road)) {
      // Grass-Road 상단
      tile = [sprites, 1, 4];
    } else if (this.equals(center, Tile.Grass) && this.equals(bottom, Tile.Road)) {
      // Grass-Road 하단
      tile = [sprites, 1, 6];
    } else {
    }
    return tile;
  }

  get spriteTile(): [HTMLImageElement, number, number] {
    const sprites = MapSprites;
    switch (this.name) {
      case Tile.Grass:
        return this.validateGrass();
      case Tile.Water:
        return [sprites, 3, 15];
      case Tile.Road:
        return [sprites, 1, 1];
      default:
        return [sprites, 1, 1];
    }
  }

  get fields() {
    return this.gameMap.fields;
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

  subDraw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis, sprites: HTMLImageElement, indexX: number, indexY: number) {
    const { x, y } = this.position;
    const { X, Y } = GAME_CONF.MAP_CONF.DEFAULT.SIZE;
    const cropSizeX = 32 * indexX + 1.07;
    const cropSizeY = 32 * indexY + 1.07;
    const cropWidth = 32 - 0.7;
    const cropHeight = 32 - 0.8;

    ctx.drawImage(sprites, cropSizeX, cropSizeY, cropWidth, cropHeight, worldAxisX + x * X, worldAxisY + y * Y, X + 0.58, Y + 0.58);
  }

  draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    // const { color } = GAME_CONF.MAP_CONF.FIELD_VALIDATE(this);
    // ctx.fillStyle = color;
    const { x, y } = this.position;
    const { X, Y } = GAME_CONF.MAP_CONF.DEFAULT.SIZE;

    // ctx.fillRect(worldAxisX + x * X, worldAxisY + y * Y, X, Y);
    // const sprites = MapSprites;
    const [sprites, indexX, indexY] = this.spriteTile;
    const cropSizeX = 32 * indexX + 1.07;
    const cropSizeY = 32 * indexY + 1.07;
    const cropWidth = 32 - 0.7;
    const cropHeight = 32 - 0.8;

    if (this.name === Tile.Grass && [4, 5, 6].includes(indexX) && [1, 2, 6, 7].includes(indexY)) {
      const cropSizeX = 32 * 3 + 1.07;
      const cropSizeY = 32 * 15 + 1.07;
      const cropWidth = 32 - 0.7;
      const cropHeight = 32 - 0.8;

      ctx.drawImage(sprites, cropSizeX, cropSizeY, cropWidth, cropHeight, worldAxisX + x * X, worldAxisY + y * Y, X + 0.58, Y + 0.58);
    }

    ctx.drawImage(sprites, cropSizeX, cropSizeY, cropWidth, cropHeight, worldAxisX + x * X, worldAxisY + y * Y, X + 0.58, Y + 0.58);
  }
}
