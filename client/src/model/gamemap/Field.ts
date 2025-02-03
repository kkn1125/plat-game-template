import {
  DecorateSprites,
  MapSprites,
  MapSprites2,
  MapSprites3,
  ObjectSprites,
} from "@/source/sprites";
import GAME_CONF from "@config/game.conf";
import { makeId } from "@util/makeId";
import { Tile } from "@variable/constant";
import GameMap from "./GameMap";

export default class Field {
  id = makeId("field");
  name: string;
  position: XY = {
    x: 0,
    y: 0,
  };
  groundLevel: number = 0;
  passable: boolean = true;
  gameMap: GameMap;
  frame: number = 0;
  FPS: number = 60;
  frameLate: number = 0.3;

  constructor(name: string, gameMap: GameMap) {
    this.name = name;
    this.gameMap = gameMap;
    this.passable = this.isPassable;
  }

  get isPassable() {
    switch (this.name) {
      case Tile.WoodFloor:
      case Tile.WoodFloorCarpet:
      case Tile.Road:
      case Tile.Grass:
      case Tile.RoadBush:
      case Tile.GrassBush:
      case Tile.RoadFlower:
      case Tile.GrassFlower:
        return true;
      case Tile.Water:
      case Tile.GrassTree:
      case Tile.RoadTree:
      case Tile.RoadStackH:
      case Tile.GrassStackH:
      case Tile.RoadStack:
      case Tile.GrassStack:
      case Tile.RoadBoard:
      case Tile.GrassBoard:
      case Tile.RoadBlock:
      case Tile.GrassBlock:
        return false;
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
    return fields.every((field) => field?.name[0] === tile);
  }

  equals(field: Field, tile: Tile) {
    return field?.name[0] === tile;
  }

  validateGrass(): [HTMLImageElement, number, number] {
    const sprites = MapSprites;
    const sprites2 = MapSprites2;
    const {
      top,
      topLeft,
      topRight,
      bottom,
      bottomLeft,
      bottomRight,
      left,
      right,
      center,
    } = this.roundFields;

    let tile: [HTMLImageElement, number, number] = [sprites, 1, 5];

    if (this.includes([top, left, bottom, right], Tile.Water)) {
      // ✨ 물 내부 1칸 길
      tile = [sprites, 7, 7];
    } else if (
      this.includes([top, bottom], Tile.Water) &&
      this.includes([left, right], Tile.Grass)
    ) {
      // ✨✨ Grass-Water 상하 물, 좌우 길 ㅡ
      tile = [sprites, 5, 7];
    } else if (
      this.includes([top, bottom, right], Tile.Water) &&
      this.equals(left, Tile.Grass)
    ) {
      // ✨✨ Grass-Water 상하우 물, 좌길 ㅡ 우끝
      tile = [sprites, 6, 7];
    } else if (
      this.includes([top, bottom, left], Tile.Water) &&
      this.equals(right, Tile.Grass)
    ) {
      // ✨✨ Grass-Water 상하좌 물, 우길 ㅡ 좌끝
      tile = [sprites, 4, 7];
    } else if (
      this.includes([top, bottom, left, right], Tile.Grass) &&
      this.includes([topRight, bottomRight], Tile.Water)
    ) {
      // ✨✨✨✨ Grass-Water 상하좌 물, 우길 ├ 좌시작
      tile = [sprites, 9, 11];
    } else if (
      this.includes([top, bottom, left, right], Tile.Grass) &&
      this.includes([topLeft, bottomLeft], Tile.Water)
    ) {
      // ✨✨✨✨ Grass-Water 상하좌 물, 우길 ┤ 우시작
      tile = [sprites, 9, 13];
    } else if (
      this.includes([left, right], Tile.Water) &&
      this.includes([top, bottom], Tile.Grass)
    ) {
      // ✨ Grass-Water 좌우 물, 상하 길
      tile = [sprites, 7, 5];
    } else if (
      this.includes([left, right, top], Tile.Water) &&
      this.equals(bottom, Tile.Grass)
    ) {
      // ✨ Grass-Water 좌우상 물, 하길
      tile = [sprites, 7, 4];
    } else if (
      this.includes([left, right, bottom], Tile.Water) &&
      this.equals(top, Tile.Grass)
    ) {
      // ✨ Grass-Water 좌우하 물, 상 잔디
      tile = [sprites, 7, 6];
    } else if (
      this.includes([left, right], Tile.Grass) &&
      this.includes([top, bottom], Tile.Grass) &&
      this.includes([topLeft, topRight], Tile.Water)
    ) {
      // ✨ Grass-Water 길에서 상단으로 1칸너비 이어지는 길
      tile = [sprites, 8, 10];
    } else if (
      this.includes([left, right], Tile.Grass) &&
      this.includes([top, bottom], Tile.Grass) &&
      this.includes([bottomLeft, bottomRight], Tile.Water)
    ) {
      // ✨ Grass-Water 길에서 하단으로 1칸너비 이어지는 길
      tile = [sprites, 8, 12];
    } else if (
      this.includes([top, left], Tile.Grass) &&
      this.equals(topLeft, Tile.Water)
    ) {
      // Grass-Water 좌상단
      tile = [sprites, 3, 9];
    } else if (
      this.includes([top, right], Tile.Grass) &&
      this.equals(topRight, Tile.Water)
    ) {
      // Grass-Water 우상단
      tile = [sprites, 2, 9];
    } else if (
      this.includes([bottom, left], Tile.Grass) &&
      this.equals(bottomLeft, Tile.Water)
    ) {
      // Grass-Water 좌하단
      tile = [sprites, 3, 8];
    } else if (
      this.includes([bottom, right], Tile.Grass) &&
      this.equals(bottomRight, Tile.Water)
    ) {
      // Grass-Water 우하단
      tile = [sprites, 2, 8];
    } else if (this.includes([bottom, left], Tile.Water)) {
      // ✨ Road-Water 좌,하 물
      tile = [sprites, 4, 6];
    } else if (this.includes([bottom, right], Tile.Water)) {
      // ✨ Road-Water 우,하 물
      tile = [sprites, 6, 6];
    } else if (this.includes([top, right], Tile.Water)) {
      // ✨ Road-Water 우,상 물
      tile = [sprites, 6, 4];
    } else if (this.includes([top, left], Tile.Water)) {
      // ✨ Road-Water 좌,상 물
      tile = [sprites, 4, 4];
    } else if (
      this.equals(right, Tile.Grass) &&
      this.equals(left, Tile.Water)
    ) {
      // Grass-Water 좌측
      tile = [sprites, 4, 5];
    } else if (
      this.equals(left, Tile.Grass) &&
      this.equals(right, Tile.Water)
    ) {
      // Grass-Water 우측
      tile = [sprites, 6, 5];
    } else if (
      this.equals(bottom, Tile.Grass) &&
      this.equals(top, Tile.Water)
    ) {
      // Grass-Water 상단
      tile = [sprites, 5, 4];
    } else if (
      this.equals(top, Tile.Grass) &&
      this.equals(bottom, Tile.Water)
    ) {
      // Grass-Water 하단
      tile = [sprites, 5, 6];
    }

    if (this.includes([top, bottom, left, right], Tile.Road)) {
      // ✨ Road-Grass 1칸
      tile = [sprites, 3, 7];
    } else if (
      this.includes([left, right], Tile.Road) &&
      this.includes([top, bottom], Tile.Grass)
    ) {
      // ✨ Road-Grass | 잔디길
      tile = [sprites, 3, 5];
    } else if (
      this.includes([left, right, bottom], Tile.Road) &&
      this.equals(top, Tile.Grass)
    ) {
      // ✨ Road-Grass | 잔디길 하끝
      tile = [sprites, 3, 6];
    } else if (
      this.includes([left, right, top], Tile.Road) &&
      this.equals(bottom, Tile.Grass)
    ) {
      // ✨ Road-Grass | 잔디길 상끝
      tile = [sprites, 3, 4];
    } else if (
      this.includes([top, bottom], Tile.Road) &&
      this.includes([left, right], Tile.Grass)
    ) {
      // ✨ Road-Grass ㅡ 잔디길
      tile = [sprites, 1, 7];
    } else if (
      this.includes([top, bottom, left], Tile.Road) &&
      this.equals(right, Tile.Grass)
    ) {
      // ✨ Road-Grass ㅡ 잔디길 좌끝
      tile = [sprites, 0, 7];
    } else if (
      this.includes([top, bottom, right], Tile.Road) &&
      this.equals(left, Tile.Grass)
    ) {
      // ✨ Road-Grass ㅡ 잔디길 우끝
      tile = [sprites, 2, 7];
    } else if (
      this.includes([top, right], Tile.Grass) &&
      this.equals(topRight, Tile.Road)
    ) {
      // Road-Grass 좌하단
      tile = [sprites, 0, 2];
    } else if (
      this.includes([top, left], Tile.Grass) &&
      this.equals(topLeft, Tile.Road)
    ) {
      // Road-Grass 우하단
      tile = [sprites, 2, 2];
    } else if (
      this.includes([bottom, right], Tile.Grass) &&
      this.equals(bottomRight, Tile.Road)
    ) {
      // Road-Grass 좌상단
      tile = [sprites, 0, 0];
    } else if (
      this.includes([bottom, left], Tile.Grass) &&
      this.equals(bottomLeft, Tile.Road)
    ) {
      // Road-Grass 우상단
      tile = [sprites, 2, 0];
    } else if (
      this.includes([top, left], Tile.Road) &&
      this.equals(right, Tile.Grass)
    ) {
      // Grass-Road 좌상단
      tile = [sprites, 0, 4];
    } else if (this.includes([top, right], Tile.Road)) {
      // Grass-Road 우상단
      tile = [sprites, 2, 4];
    } else if (this.includes([bottom, left], Tile.Road)) {
      // Grass-Road 좌하단
      tile = [sprites, 0, 6];
    } else if (this.includes([bottom, right], Tile.Road)) {
      // Grass-Road 우하단
      tile = [sprites, 2, 6];
    } else if (this.equals(left, Tile.Road)) {
      // Grass-Road 좌측
      tile = [sprites, 0, 5];
    } else if (this.equals(right, Tile.Road)) {
      // Grass-Road 우측
      tile = [sprites, 2, 5];
    } else if (this.equals(top, Tile.Road)) {
      // Grass-Road 상단
      tile = [sprites, 1, 4];
    } else if (this.equals(bottom, Tile.Road)) {
      // Grass-Road 하단
      tile = [sprites, 1, 6];
    } else {
      //
    }
    return tile;
  }

  validateRoad(): [HTMLImageElement, number, number] {
    const sprites = MapSprites;
    const sprites2 = MapSprites2;
    const {
      top,
      topLeft,
      topRight,
      bottom,
      bottomLeft,
      bottomRight,
      left,
      right,
      center,
    } = this.roundFields;

    let tile: [HTMLImageElement, number, number] = [sprites, 1, 1];

    if (this.includes([top, left, bottom, right], Tile.Water)) {
      // ✨ 물 내부 1칸 길
      tile = [sprites, 7, 3];
    } else if (
      this.includes([top, bottom], Tile.Water) &&
      this.includes([left, right], Tile.Road)
    ) {
      // ✨✨ Road-Water 상하 물, 좌우 길 ㅡ
      tile = [sprites, 5, 3];
    } else if (
      this.includes([top, bottom, right], Tile.Water) &&
      this.equals(left, Tile.Road)
    ) {
      // ✨✨ Road-Water 상하우 물, 좌길 ㅡ 우끝
      tile = [sprites, 6, 3];
    } else if (
      this.includes([top, bottom, left], Tile.Water) &&
      this.equals(right, Tile.Road)
    ) {
      // ✨✨ Road-Water 상하좌 물, 우길 ㅡ 좌끝
      tile = [sprites, 4, 3];
    } else if (
      this.includes([top, bottom, left, right], Tile.Road) &&
      this.includes([topRight, bottomRight], Tile.Water)
    ) {
      // ✨✨✨✨ Road-Water 상하좌 물, 우길 ├ 좌시작
      tile = [sprites, 8, 5];
    } else if (
      this.includes([top, bottom, left, right], Tile.Road) &&
      this.includes([topLeft, bottomLeft], Tile.Water)
    ) {
      // ✨✨✨✨ Road-Water 상하좌 물, 우길 ┤ 우시작
      tile = [sprites, 8, 8];
    } else if (
      this.includes([left, right], Tile.Water) &&
      this.includes([top, bottom], Tile.Road)
    ) {
      // ✨ Road-Water 좌우 물, 상하 길 |
      tile = [sprites, 7, 1];
    } else if (
      this.includes([left, right, top], Tile.Water) &&
      this.equals(bottom, Tile.Road)
    ) {
      // ✨ Road-Water 좌우상 물, 하길 | 하끝
      tile = [sprites, 7, 0];
    } else if (
      this.includes([left, right, bottom], Tile.Water) &&
      this.equals(top, Tile.Road)
    ) {
      // ✨ Road-Water 좌우하 물, 상길 | 상끝
      tile = [sprites, 7, 2];
    } else if (
      this.includes([left, right], Tile.Road) &&
      this.includes([top, bottom], Tile.Road) &&
      this.includes([topLeft, topRight], Tile.Water)
    ) {
      // ✨ Road-Water 길에서 상단으로 1칸너비 이어지는 길
      tile = [sprites, 8, 4];
    } else if (
      this.includes([left, right], Tile.Road) &&
      this.includes([top, bottom], Tile.Road) &&
      this.includes([bottomLeft, bottomRight], Tile.Water)
    ) {
      // ✨ Road-Water 길에서 하단으로 1칸너비 이어지는 길
      tile = [sprites, 9, 6];
    } else if (
      this.includes([top, left], Tile.Road) &&
      this.equals(topLeft, Tile.Water)
    ) {
      // Road-Water 좌상단
      tile = [sprites, 1, 9];
    } else if (
      this.includes([top, right], Tile.Road) &&
      this.equals(topRight, Tile.Water)
    ) {
      // Road-Water 우상단
      tile = [sprites, 0, 9];
    } else if (
      this.includes([bottom, left], Tile.Road) &&
      this.equals(bottomLeft, Tile.Water)
    ) {
      // Road-Water 좌하단
      tile = [sprites, 1, 8];
    } else if (
      this.includes([bottom, right], Tile.Road) &&
      this.equals(bottomRight, Tile.Water)
    ) {
      // Road-Water 우하단
      tile = [sprites, 0, 8];
    } else if (this.includes([bottom, left], Tile.Water)) {
      // ✨ Road-Water 좌,하 물
      tile = [sprites, 4, 2];
    } else if (this.includes([bottom, right], Tile.Water)) {
      // ✨ Road-Water 우,하 물
      tile = [sprites, 6, 2];
    } else if (this.includes([top, right], Tile.Water)) {
      // ✨ Road-Water 우,상 물
      tile = [sprites, 6, 0];
    } else if (this.includes([top, left], Tile.Water)) {
      // ✨ Road-Water 좌,상 물
      tile = [sprites, 4, 0];
    } else if (this.equals(left, Tile.Water)) {
      // Road-Water 좌측
      tile = [sprites, 4, 1];
    } else if (this.equals(right, Tile.Water)) {
      // Road-Water 우측
      tile = [sprites, 6, 1];
    } else if (this.equals(top, Tile.Water)) {
      // Road-Water 상단
      tile = [sprites, 5, 0];
    } else if (this.equals(bottom, Tile.Water)) {
      // Road-Water 하단
      tile = [sprites, 5, 2];
    }

    return tile;
  }

  get spriteTile(): [HTMLImageElement, number, number] {
    const sprites = MapSprites;
    const tile = this.name[0];
    switch (tile) {
      case Tile.WoodFloor:
        return [MapSprites3, 0, 0];
      case Tile.Grass:
        return this.validateGrass();
      case Tile.Water:
        return [sprites, 3, 15];
      case Tile.Road:
        return this.validateRoad();
      default:
        return [sprites, 1, 1];
    }
  }

  get objectSpriteTile() {
    const objectSprites = ObjectSprites;
    switch (this.name) {
      case Tile.GrassStack:
      case Tile.RoadStack:
      case Tile.GrassBoard:
      case Tile.RoadBoard:
      case Tile.GrassTree:
      case Tile.RoadTree:
        return objectSprites;
      default:
        return objectSprites;
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

  // subDraw(
  //   ctx: CanvasRenderingContext2D,
  //   { worldAxisX, worldAxisY }: WorldAxis,
  //   sprites: HTMLImageElement,
  //   indexX: number,
  //   indexY: number
  // ) {
  //   const { x, y } = this.position;
  //   const { X, Y } = GAME_CONF.MAP_CONF.DEFAULT.SIZE;
  //   const cropSizeX = 32 * indexX + 0.07;
  //   const cropSizeY = 32 * indexY + 0.07;
  //   const cropWidth = 32 - 0.07;
  //   const cropHeight = 32 - 0.07;

  //   ctx.drawImage(
  //     sprites,
  //     cropSizeX,
  //     cropSizeY,
  //     cropWidth,
  //     cropHeight,
  //     worldAxisX + x * X,
  //     worldAxisY + y * Y,
  //     X + 0.5,
  //     Y + 0.5
  //   );
  // }

  // draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
  //   this.drawMap(ctx, { worldAxisX, worldAxisY });
  //   this.drawObject(ctx, { worldAxisX, worldAxisY });
  // }

  drawMap(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis,
    scale: number = 1
  ) {
    // const { color } = GAME_CONF.MAP_CONF.FIELD_VALIDATE(this);
    // ctx.fillStyle = color;
    const { x, y } = this.position;
    // const { X, Y } = GAME_CONF.MAP_CONF.DEFAULT.SIZE;
    const X = GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    const Y = GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
    const tile = this.name[0];

    // if (this.name === Tile.GrassTree) {
    //   console.log(tile);
    // }

    // ctx.fillRect(worldAxisX + x * X, worldAxisY + y * Y, X, Y);
    // const sprites = MapSprites;
    const [sprites, indexX, indexY] = this.spriteTile;
    const cropSizeX = 32 * indexX + 0.2;
    const cropSizeY = 32 * indexY + 0.2;
    const cropWidth = 32 - 0.07;
    const cropHeight = 32 - 0.07;

    /* 물 연접 타일 아래 물 렌더링 */
    if (
      (tile === Tile.Grass || tile === Tile.Road) &&
      [0, 1, 4, 5, 6, 7, 8, 9].includes(indexX) &&
      [0, 1, 2, 4, 5, 6, 7, 7, 9, 10, 12].includes(indexY)
    ) {
      const cropSizeX = 32 * 3 + 0.07;
      const cropSizeY = 32 * 15 + 0.07;
      const cropWidth = 32 - 0.07;
      const cropHeight = 32 - 0.07;

      ctx.drawImage(
        sprites,
        cropSizeX,
        cropSizeY,
        cropWidth,
        cropHeight,
        (worldAxisX + x * X) * scale,
        (worldAxisY + y * Y) * scale,
        (X + 0.5) * scale,
        (Y + 0.5) * scale
      );
    }

    const frame = Math.floor((this.frame / (this.FPS * this.frameLate)) % 4);
    const frameValue = Math.abs((frame % 4) - 2) - 1;
    // console.log(frame, frameValue);
    // console.log(frameValue)
    // if (Math.abs(frame) === 2) {
    //   this.waterDir = !this.waterDir;
    // }
    // const dir = this.waterDir ? 1 : -1;

    /* 물 움직임 애니메이션 */
    if (tile === Tile.Water) {
      ctx.drawImage(
        sprites,
        cropSizeX,
        cropSizeY,
        cropWidth,
        cropHeight,
        (worldAxisX + x * X) * scale,
        (worldAxisY + y * Y) * scale,
        (X + 0.5) * scale,
        (Y + 0.5) * scale
      );
      ctx.drawImage(
        sprites,
        cropSizeX,
        cropSizeY,
        cropWidth,
        cropHeight,
        (worldAxisX + x * X) * scale,
        (worldAxisY + y * Y) * scale,
        (X + 0.5 + 2 + frameValue * 1.5) * scale,
        (Y + 0.5) * scale
      );
    } else {
      ctx.drawImage(
        sprites,
        cropSizeX,
        cropSizeY,
        cropWidth,
        cropHeight,
        (worldAxisX + x * X) * scale,
        (worldAxisY + y * Y) * scale,
        (X + 0.5) * scale,
        (Y + 0.5) * scale
      );
    }

    this.frame += 1 /* (this.frame + 1) % this.FPS */;
  }

  drawObject(
    ctx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis,
    emboss: boolean = false,
    scale: number = 1
  ) {
    const { x, y } = this.position;
    const X = GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    const Y = GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
    const tile = this.name[0];

    const sprites = this.objectSpriteTile;

    const { bottom } = this.roundFields;
    const isBottomWater = bottom?.name[0] === Tile.Water;

    // if (this.name === Tile.WoodFloorCarpet && !emboss) {
    //   ctx.drawImage(
    //     MapSprites3,
    //     33, // aaa
    //     0,
    //     33, // a
    //     33,
    //     worldAxisX + x * X, // aaa * 2
    //     worldAxisY + y * Y, // 육지 나무 Y 축 위치
    //     X, // a * 2
    //     Y, // 물 위 나무 Y 축 위치
    //   );
    // }

    if (this.name === Tile.GrassTree || this.name === Tile.RoadTree) {
      // ctx.fillRect(worldAxisX + x * X, worldAxisY + y * Y, X + 0.5, Y + 0.5);
      // const { CropSizeX, CropSizeY, CropWidth, CropHeight } = TileCrop.GrassTree;
      ctx.drawImage(
        sprites,
        0, // aaa
        0,
        60, // a
        100,
        (worldAxisX + x * X - 30) * scale, // aaa * 2
        (worldAxisY + y * Y - 95 + (isBottomWater ? -10 : 0)) * scale, // 육지 나무 Y 축 위치
        (X + 60) * scale, // a * 2
        (Y + 100) * scale // 물 위 나무 Y 축 위치
      );
    }

    if (this.name === Tile.GrassBush || this.name === Tile.RoadBush) {
      ctx.drawImage(
        sprites,
        0, // aaa
        100,
        40, // a
        40,
        (worldAxisX + x * X - 10) * scale, // aaa * 2
        (worldAxisY + y * Y + (isBottomWater ? -30 : 0)) * scale, // 육지 나무 Y 축 위치
        (X + 20) * scale, // a * 2
        (Y + 20) * scale // 물 위 나무 Y 축 위치
      );
    }

    if (this.name === Tile.GrassBoard || this.name === Tile.RoadBoard) {
      // ctx.fillRect(worldAxisX + x * X, worldAxisY + y * Y, X + 0.5, Y + 0.5);

      if (!emboss) {
        ctx.drawImage(
          sprites,
          168, // aaa
          130,
          40, // a
          40,
          (worldAxisX + x * X - 10) * scale, // aaa * 2
          (worldAxisY + y * Y + (isBottomWater ? -30 : 0)) * scale, // 육지 나무 Y 축 위치
          (X + 20) * scale, // a * 2
          (Y + 20) * scale // 물 위 나무 Y 축 위치
        );
      }
    }

    if (this.name === Tile.GrassStack || this.name === Tile.RoadStack) {
      // ctx.fillRect(worldAxisX + x * X, worldAxisY + y * Y, X + 0.5, Y + 0.5);

      if (!emboss) {
        ctx.drawImage(
          sprites,
          210, // aaa
          230,
          50, // a
          50,
          (worldAxisX + x * X - 3.5) * scale, // aaa * 2
          (worldAxisY + y * Y + (isBottomWater ? -30 : 0) - 10) * scale, // 육지 나무 Y 축 위치
          (X + 20) * scale, // a * 2
          (Y + 20) * scale // 물 위 나무 Y 축 위치
        );
      }
    }

    if (this.name === Tile.GrassStackH || this.name === Tile.RoadStackH) {
      // ctx.fillRect(worldAxisX + x * X, worldAxisY + y * Y, X + 0.5, Y + 0.5);

      if (!emboss) {
        ctx.drawImage(
          sprites,
          152, // aaa
          230,
          50, // a
          50,
          (worldAxisX + x * X - 3.5 - 5) * scale, // aaa * 2
          (worldAxisY + y * Y + (isBottomWater ? -30 : 0) - 30) * scale, // 육지 나무 Y 축 위치
          (X + 20) * scale, // a * 2
          (Y + 20) * scale // 물 위 나무 Y 축 위치
        );
        ctx.drawImage(
          sprites,
          152, // aaa
          230,
          50, // a
          50,
          (worldAxisX + x * X - 3.5 + 2) * scale, // aaa * 2
          (worldAxisY + y * Y + (isBottomWater ? -30 : 0)) * scale, // 육지 나무 Y 축 위치
          (X + 20) * scale, // a * 2
          (Y + 20) * scale // 물 위 나무 Y 축 위치
        );
      }
    }

    if (this.name === Tile.RoadFlower || this.name === Tile.GrassFlower) {
      // ctx.fillRect(worldAxisX + x * X, worldAxisY + y * Y, X + 0.5, Y + 0.5);
      ctx.drawImage(
        DecorateSprites,
        3, // aaa
        8,
        18, // a
        20,
        (worldAxisX + x * X - 3.5 + 15) * scale, // aaa * 2
        (worldAxisY + y * Y + (isBottomWater ? -30 : 0) + 15) * scale, // 육지 나무 Y 축 위치
        (X - 25) * scale, // a * 2
        (Y - 25) * scale // 물 위 나무 Y 축 위치
      );
    }
  }
}
