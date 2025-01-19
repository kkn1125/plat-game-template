import GAME_CONF from '@config/game.conf';
import { AttackableUnit } from './implement/AttackableUnit';
import TouchableUnit from './implement/TouchableUnit';
import UseStat from './implement/UseStat';
import Stat from './option/Stat';
import UseEquipment from './implement/UseEquipment';
import Equipment from './option/Equipment';
import { UnitState } from '@variable/constant';
import MoveableUnit from './implement/MoveableUnit';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import Location from './option/Location';

type Option = {
  hp?: number;
  mp?: number;
};

class Unit implements TouchableUnit, AttackableUnit, UseStat, UseEquipment, MoveableUnit {
  logger = new Logger<Unit>(this);

  location = new Location('Town1');

  id = makeId('unit');
  name: string;

  position: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  size: {
    x: number;
    y: number;
  } = {
    x: GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X,
    y: GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y,
  };

  velocity: { x: number; y: number } = {
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

  blocking(dir: 'up' | 'down' | 'left' | 'right') {
    switch (dir) {
      case 'up':
        this.position.y += this.speed;
        break;
      case 'down':
        this.position.y -= this.speed;
        break;
      case 'left':
        this.position.x += this.speed;
        break;
      case 'right':
        this.position.x -= this.speed;
        break;
      default:
        break;
    }
  }

  changeLocation(location: Maps) {
    this.logger.debug('위치 변경:', location);
    this.location.locate = location;
  }

  move(x: number, y: number): void {
    this.position.x = this.position.x + x;
    this.position.y = this.position.y + y;
  }

  draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    ctx.fillRect(worldAxisX + moveScreenX, worldAxisY + moveScreenY, this.size.x, this.size.y);
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
