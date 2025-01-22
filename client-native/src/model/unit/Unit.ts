import { CharacterSprites } from '@/source/sprites';
import GAME_CONF from '@config/game.conf';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import { UnitState } from '@variable/constant';
import { AttackableUnit } from './implement/AttackableUnit';
import MoveableUnit from './implement/MoveableUnit';
import TouchableUnit from './implement/TouchableUnit';
import UseEquipment from './implement/UseEquipment';
import UseStat from './implement/UseStat';
import Equipment from '../option/Equipment';
import Location from '../option/Location';
import Stat from '../option/Stat';
import GameEngine from '@core/GameEngine';
import GameMap from '@model/gamemap/GameMap';

class Unit implements TouchableUnit, AttackableUnit, UseStat, UseEquipment, MoveableUnit {
  order: string[] = [];
  joystick: {
    w: boolean;
    a: boolean;
    d: boolean;
    s: boolean;
  } = {
    w: false,
    a: false,
    d: false,
    s: false,
  };

  engine!: GameEngine;

  logger = new Logger<Unit>(this);

  location = new Location('Town1');

  id: MakeId<string> = makeId('unit');
  name: string;

  position: XY = {
    x: 0,
    y: 0,
  };

  size: XY = {
    x: GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X,
    y: GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y,
  };

  velocity: XY = {
    x: 0,
    y: 0,
  };
  increaseSpeed: number = GAME_CONF.UNIT_CONF.DEFAULT.INCREASE_SPEED;
  speed: number = GAME_CONF.UNIT_CONF.DEFAULT.SPEED;

  hp: number = GAME_CONF.UNIT_CONF.DEFAULT.HP;
  mp: number = GAME_CONF.UNIT_CONF.DEFAULT.MP;
  maxHp: number = GAME_CONF.UNIT_CONF.DEFAULT.HP;
  maxMp: number = GAME_CONF.UNIT_CONF.DEFAULT.MP;

  state: UnitState = UnitState.Idle;
  stat: Stat = new Stat(this);
  equipment: Equipment = new Equipment(this);

  defaultDamage: number = GAME_CONF.UNIT_CONF.DEFAULT.DAMAGE;
  unitColor: string = 'black';

  cropSizeX = 150;
  cropSizeY = 200;
  cropPadX = 10;
  cropPadY = 20;
  limitFrame = 4;
  FPS: number = 60;
  frame = 0;
  sprites = CharacterSprites;

  gaze: Gaze = GAME_CONF.UNIT_CONF.DEFAULT.GAZE;

  // GameEngine 제어 유닛 등록 부분 참조
  detectable: boolean = true;
  boundary: Unit | null = null;

  aroundUnits: Unit[] = [];

  constructor(name: string, option?: HealthOption) {
    this.name = name;
    if (option) {
      option.hp && (this.hp = option.hp);
      option.hp && (this.maxHp = option.hp);
      option.mp && (this.mp = option.mp);
    }
  }

  get isControlUnit() {
    return this === this.engine.controlUnit;
  }

  get minDamage() {
    return (this.defaultDamage + this.stat.str) * 10;
  }

  get maxDamage() {
    return +Math.floor((this.defaultDamage + this.stat.str + this.stat.dex * GAME_CONF.UNIT_CONF.INCREASE_DAMAGE_RATIO) * 10).toFixed(1);
  }

  get damageGap() {
    return +(this.maxDamage - this.minDamage + 1).toFixed(1);
  }

  get damage() {
    const rangeDamage = Math.floor(Math.random() * this.damageGap);
    return +((this.minDamage + rangeDamage) / 10).toFixed(1);
  }

  get fieldPosition() {
    const fields = this.engine.gameMapManager.currentMap?.fields;

    if (!fields) return [];
  }

  get gazeValue() {
    switch (this.gaze) {
      case 'bottom':
        return 0;
      case 'top':
        return 200;
      case 'left':
        return 400;
      case 'right':
        return 600;
      default:
        return 0;
    }
  }

  setLocation(gameMap: GameMap) {
    this.location.locate = gameMap.name;
  }

  setSprites(sprites: HTMLImageElement) {
    this.sprites = sprites;
  }

  setGameEngine(engine: GameEngine) {
    this.engine = engine;
  }

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }

  setPositionByField(indexX: number, indexY: number) {
    this.position.x = indexX * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    this.position.y = indexY * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
  }

  setState(state: UnitState) {
    this.state = state;
  }

  changeLocation(location: Maps) {
    this.logger.debug('위치 변경:', location);
    this.location.locate = location;
  }

  move(x: number, y: number): void {
    this.position.x = this.position.x + x;
    this.position.y = this.position.y + y;
  }

  detect() {
    const currentMap = this.engine.gameMapManager.currentMap;
    const controlUnit = this.engine.controlUnit;
    if (!currentMap) return;
    if (!controlUnit) return;
    // const fields = currentMap.fields;
    const mapSizeX = this.engine.gameMapManager.mapSizeX;
    const mapSizeY = this.engine.gameMapManager.mapSizeY;

    const { x, y } = this.position;
    const fieldX = Math.floor(x / mapSizeX);
    const fieldY = Math.floor(y / mapSizeY);

    const cUnitX = Math.floor(controlUnit.position.x / mapSizeX);
    const cUnitY = Math.floor(controlUnit.position.y / mapSizeY);
    if (fieldX - 1 <= cUnitX && cUnitX <= fieldX + 1 && fieldY - 1 <= cUnitY && cUnitY <= fieldY + 1) {
      this.boundary = controlUnit;
    } else {
      this.boundary = null;
    }
  }

  around() {
    const currentMap = this.engine.gameMapManager.currentMap;
    const units = [...this.engine.sameLocationUnits, ...this.engine.sameLocationPortals];
    if (!currentMap) return;
    if (units.length === 0) return;
    // const fields = currentMap.fields;
    const mapSizeX = this.engine.gameMapManager.mapSizeX;
    const mapSizeY = this.engine.gameMapManager.mapSizeY;

    const { x, y } = this.position;
    const fieldX = Math.floor(x / mapSizeX);
    const fieldY = Math.floor(y / mapSizeY);

    for (const unit of units) {
      const cUnitX = Math.floor(unit.position.x / mapSizeX);
      const cUnitY = Math.floor(unit.position.y / mapSizeY);
      if (fieldX - 1 <= cUnitX && cUnitX <= fieldX + 1 && fieldY - 1 <= cUnitY && cUnitY <= fieldY + 1) {
        if (!this.aroundUnits.includes(unit)) {
          this.aroundUnits.push(unit);
        }
      } else {
        this.aroundUnits = this.aroundUnits.filter((u) => u !== unit);
      }
    }
  }

  get closeUnit(): Unit | null {
    let closeUnit = null;
    const getDistance = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    const { x, y } = this.position;
    // console.log(this.aroundUnits);
    for (const unit of this.aroundUnits) {
      const { x: uX, y: uY } = unit.position;
      const distance = getDistance(x, y, uX, uY);
      if (!closeUnit) {
        closeUnit = unit;
      } else {
        if (distance < getDistance(x, y, closeUnit.position.x, closeUnit.position.y)) {
          closeUnit = unit;
        }
      }
    }

    return closeUnit;
  }

  draw(ctx: CanvasRenderingContext2D, labelCtx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    if (!this.isControlUnit && this.detectable) {
      this.detect();
      this.drawDetect(ctx, { worldAxisX, worldAxisY });
    }

    // if (this.isControlUnit && this.aroundUnits.length > 0 && this.closeUnit) {
    //   this.boundary = this.closeUnit;
    // } else {
    //   this.boundary = null;
    // }

    // 색상 표시
    // ctx.fillRect(positionX, positionY, this.size.x, this.size.y);

    this.drawName(labelCtx, { worldAxisX, worldAxisY });
    this.drawCharacter(ctx, { worldAxisX, worldAxisY });
  }

  drawDetect(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    if (this.boundary) {
      const moveScreenX = this.position.x;
      const moveScreenY = this.position.y;

      const positionX = worldAxisX + moveScreenX;
      const positionY = worldAxisY + moveScreenY;

      ctx.font = 'bold 30px auto';

      /* stroke */
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;

      ctx.strokeText('!', positionX + (this.size.x + 3 / 2) / 2, positionY - 40);

      /* font */
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText('!', positionX + this.size.x / 2, positionY - 40);
    }
  }

  drawName(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;
    ctx.font = 'bold 16px auto';

    /* stroke */
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;

    ctx.strokeText(this.name.toUpperCase(), positionX + (this.size.x + 3 / 2) / 2, positionY - 20);

    /* font */
    ctx.textAlign = 'center';
    ctx.fillText(this.name.toUpperCase(), positionX + this.size.x / 2, positionY - 20);
  }

  drawCharacter(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    // ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;

    const frame = this.state === UnitState.Idle ? 0 : Math.floor((this.frame / (this.FPS * 0.15)) % this.limitFrame);
    const cropPositionX = this.cropPadX + frame * this.cropSizeX; // next frame
    const cropPositionY = this.cropPadY + this.gazeValue; // gaze
    const cropSizeX = this.cropSizeX - this.cropPadX * 2;
    const cropSizeY = this.cropSizeY - this.cropPadY * 2;
    // 스프라이츠 표시
    ctx.drawImage(
      this.sprites,
      cropPositionX,
      cropPositionY,
      cropSizeX,
      cropSizeY,
      positionX - 5,
      positionY - 10,
      this.size.x + 10,
      this.size.y + 10,
    );
    if (this.state === UnitState.Move) {
      this.frame = this.frame + 1;
    } else {
      this.frame = 0;
    }
  }

  attack(): void {
    throw new Error('Method not implemented.');
  }

  getHp(): number {
    throw new Error('Method not implemented.');
  }

  getMp(): number {
    throw new Error('Method not implemented.');
  }

  decreaseHp(amount: number): void {
    throw new Error('Method not implemented.');
  }

  decreaseMp(amount: number): void {
    throw new Error('Method not implemented.');
  }

  getDamage(): number {
    throw new Error('Method not implemented.');
  }
}

export default Unit;
