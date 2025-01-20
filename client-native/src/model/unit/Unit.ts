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
import Equipment from './option/Equipment';
import Location from './option/Location';
import Stat from './option/Stat';

type Option = {
  hp?: number;
  mp?: number;
};

class Unit implements TouchableUnit, AttackableUnit, UseStat, UseEquipment, MoveableUnit {
  logger = new Logger<Unit>(this);

  location = new Location('Town1');

  id = makeId('unit');
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

  FPS: number = 60;
  frame = 0;
  readonly sprites = CharacterSprites;

  gaze: Gaze = GAME_CONF.UNIT_CONF.DEFAULT.GAZE;

  constructor(name: string, option?: Option) {
    this.name = name;
    if (option) {
      option.hp && (this.hp = option.hp);
      option.hp && (this.maxHp = option.hp);
      option.mp && (this.mp = option.mp);
    }
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

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }

  setState(state: UnitState) {
    this.state = state;
  }

  // blocking(dir: Gaze) {
  //   switch (dir) {
  //     case 'top':
  //       this.position.y += this.speed;
  //       break;
  //     case 'bottom':
  //       this.position.y -= this.speed;
  //       break;
  //     case 'left':
  //       this.position.x += this.speed;
  //       break;
  //     case 'right':
  //       this.position.x -= this.speed;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  changeLocation(location: Maps) {
    this.logger.debug('위치 변경:', location);
    this.location.locate = location;
  }

  move(x: number, y: number): void {
    this.position.x = this.position.x + x;
    this.position.y = this.position.y + y;
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

  draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    // ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;

    const frame = this.state === UnitState.Idle ? 0 : Math.floor((this.frame / (this.FPS * 0.15)) % 4);
    const cropPositionX = 10 + frame * 150; // next frame
    const cropPositionY = 20 + this.gazeValue; // gaze
    const cropSizeX = 150 - 20;
    const cropSizeY = 200 - 40;

    // 색상 표시
    // ctx.fillRect(positionX, positionY, this.size.x, this.size.y);

    this.drawName(ctx, { worldAxisX, worldAxisY });
    // 스프라이츠 표시
    ctx.drawImage(this.sprites, cropPositionX, cropPositionY, cropSizeX, cropSizeY, positionX, positionY, this.size.x, this.size.y);
    if (this.state === UnitState.Move) {
      this.frame = this.frame + 1;
    } else {
      this.frame = 0;
    }
  }

  drawName(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;
    ctx.font = 'bold 16px "Fira Fonts", sans-serif';

    /* stroke */
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeText(this.name.toUpperCase(), positionX + this.size.x / 2, positionY - 10);

    /* font */
    ctx.textAlign = 'center';
    ctx.fillText(this.name.toUpperCase(), positionX + this.size.x / 2, positionY - 10);
    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 0.7;
    // ctx.strokeText(this.name.toUpperCase(), positionX + this.size.x / 2, positionY - 10);
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
