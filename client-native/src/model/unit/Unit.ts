import { CharacterSprites } from '@/source/sprites';
import hitCountEffect from '@animation/effect/hitCountEffect';
import GAME_CONF from '@config/game.conf';
import GameEngine from '@core/GameEngine';
import GameMap from '@model/gamemap/GameMap';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import { UnitState } from '@variable/constant';
import Location from '../option/Location';
import Stat from '../option/Stat';
import { AttackableUnit } from './implement/AttackableUnit';
import MoveableUnit from './implement/MoveableUnit';
import TouchableUnit from './implement/TouchableUnit';
import UseStat from './implement/UseStat';
import Monster from './monster/Monster';
import UseEquipment from './implement/UseEquipment';
import UseInventory from './implement/UseInventory';
import Equipment from '@model/option/Equipment';
import Inventory from '@model/option/Inventory';
import { Taecho } from '@store/maps';

class Unit implements TouchableUnit, AttackableUnit, UseStat, MoveableUnit, UseEquipment, UseInventory {
  initPosition!: XY;
  originPosition!: XY;
  taskQueue: string[] = [];
  level: number = 0;
  exp: number = 0;
  gold: number = 0;
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
  location = new Location(Taecho.name);
  id: MakeId<string> = makeId('unit');
  name: string;
  position: XY = {
    x: 0,
    y: 0,
  };
  velocity: XY = {
    x: 0,
    y: 0,
  };
  size: XY = {
    x: GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X,
    y: GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y,
  };
  increaseSpeed: number = GAME_CONF.UNIT_CONF.DEFAULT.INCREASE_SPEED;
  speed: number = GAME_CONF.UNIT_CONF.DEFAULT.SPEED;
  attackSpeed: number = GAME_CONF.UNIT_CONF.DEFAULT.ATTACK_SPEED;
  hp: number = GAME_CONF.UNIT_CONF.DEFAULT.HP;
  mp: number = GAME_CONF.UNIT_CONF.DEFAULT.MP;
  maxHp: number = GAME_CONF.UNIT_CONF.DEFAULT.HP;
  maxMp: number = GAME_CONF.UNIT_CONF.DEFAULT.MP;
  defaultDamage: number = GAME_CONF.UNIT_CONF.DEFAULT.DAMAGE;

  state: UnitState = UnitState.Idle;
  stat: Stat = new Stat(this);
  equipment: Equipment = new Equipment(this);
  inventory: Inventory = new Inventory(this);

  unitColor: string = 'black';
  hitColor: string = '#00ff00';
  cropSizeX = 150;
  cropSizeY = 200;
  cropPadX = 10;
  cropPadY = 20;
  limitFrame = 4;
  FPS: number = 60;
  frameLate = 0.15;
  frame = 0;
  sprites = CharacterSprites;

  gaze: Gaze = GAME_CONF.UNIT_CONF.DEFAULT.GAZE;

  // GameEngine 제어 유닛 등록 부분 참조
  detectable: boolean = true;
  boundary: Unit | null = null;
  attackRange: number = GAME_CONF.UNIT_CONF.DEFAULT.ATTACK_RANGE;
  detectRange: number = GAME_CONF.UNIT_CONF.DEFAULT.DETECT_RANGE;
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
    return Object.is(this, this.engine.controlUnit);
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
    return +((this.minDamage + rangeDamage) / 10).toFixed(0);
  }

  get fieldPosition() {
    const fields = this.engine.gameMapManager.currentMap?.fields;

    if (!fields) return [];
  }

  get gazeValue() {
    switch (this.gaze) {
      case 'bottom':
        return this.cropSizeY * 0;
      case 'top':
        return this.cropSizeY * 1;
      case 'left':
        return this.cropSizeY * 2;
      case 'right':
        return this.cropSizeY * 3;
      default:
        return 0;
    }
  }

  get totalAttackRange() {
    return this.attackRange;
  }

  get isDead() {
    return this.hp <= 0;
  }

  get isAlive() {
    return this.hp > 0;
  }

  get maxExp() {
    return Math.floor(100 * (this.level + 1) ** 1.5);
  }

  get canLevelup() {
    return this.exp >= this.maxExp;
  }

  addExp(exp: number) {
    this.exp += exp;
    if (this.canLevelup) {
      this.exp = this.exp - this.maxExp;
      this.levelUp(1);
    }
  }

  levelUp(level: number) {
    this.level += level;
    this.maxHp = this.maxHp + Math.floor((this.level + 1) ** 1.5);
    this.maxMp = this.maxMp + Math.floor((this.level + 1) ** 1.5);
  }

  setLocation(gameMap: GameMap<Maps>) {
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
    this.initPosition = { x, y };
    this.originPosition = { x, y };
  }

  setPositionByField(indexX: number, indexY: number) {
    this.position.x = indexX * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
    this.position.y = indexY * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
    this.initPosition = { x: indexX * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X, y: indexY * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y };
    this.originPosition = { x: indexX * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X, y: indexY * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y };
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
    if (!this.detectable) return;

    const range = this.getDistance(controlUnit);

    if (range < this.detectRange && controlUnit.isAlive) {
      this.boundary = controlUnit;
    } else {
      this.boundary = null;
    }
  }

  around() {
    const currentMap = this.engine.gameMapManager.currentMap;
    const units = [
      ...this.engine.sameLocationMonsters,
      ...this.engine.sameLocationNpcs,
      ...this.engine.sameLocationPortals,
      ...this.engine.sameLocationBuildings,
    ];
    if (!currentMap) return;
    if (units.length === 0) return;
    const mapSizeX = this.engine.gameMapManager.mapSizeX;
    const mapSizeY = this.engine.gameMapManager.mapSizeY;

    const { x, y } = this.position;

    for (const unit of units) {
      const range = this.getDistance(unit);
      if (range < this.attackRange) {
        /* 공격 가능 범위 유닛 넣기 */
        if (!this.aroundUnits.includes(unit)) {
          this.aroundUnits.push(unit);
        }
      } else {
        /* 공격 가능 범위 벗어난 유닛 빼기 */
        this.aroundUnits = this.aroundUnits.filter((u) => u !== unit);
      }
    }
    /* 불능 판정 유닛 제거 */
    this.aroundUnits = this.aroundUnits.filter((u) => !u.isDead);
  }

  getDistance(unit: Unit) {
    const x1 = this.position.x;
    const y1 = this.position.y;
    const x2 = unit.position.x;
    const y2 = unit.position.y;
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  get closeUnit(): Unit | null {
    let closeUnit = null;
    for (const unit of this.aroundUnits) {
      const distance = this.getDistance(unit);
      if (!closeUnit) {
        closeUnit = unit;
      } else {
        if (distance < this.getDistance(closeUnit)) {
          closeUnit = unit;
        }
      }
    }
    return closeUnit;
  }

  draw(ctx: CanvasRenderingContext2D, labelCtx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    if (!this.isControlUnit && this.detectable) {
      this.detect();
      if (GAME_CONF.MAP_CONF.DISPLAY.DETECT[this.constructor.name.toUpperCase() as OptionName]) {
        this.drawDetect(ctx, { worldAxisX, worldAxisY });
      }
    }

    if (GAME_CONF.MAP_CONF.DISPLAY.HEALTH[this.constructor.name.toUpperCase() as OptionName]) {
      this.drawHealth(labelCtx, { worldAxisX, worldAxisY });
    }

    if (this.isControlUnit && GAME_CONF.MAP_CONF.DISPLAY.EXP) {
      this.drawExp(labelCtx);
    }

    if (GAME_CONF.MAP_CONF.DISPLAY.NAME[this.constructor.name.toUpperCase() as OptionName]) {
      this.drawName(labelCtx, { worldAxisX, worldAxisY });
    }
    this.drawCharacter(ctx, { worldAxisX, worldAxisY });
  }

  drawDetect(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    if (this.boundary) {
      const moveScreenX = this.position.x;
      const moveScreenY = this.position.y;
      const offset = 50;
      const positionX = worldAxisX + moveScreenX;
      const positionY = worldAxisY + moveScreenY;

      ctx.font = 'bold 30px auto';

      /* stroke */
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;

      ctx.strokeText(this.constructor.name === 'Npc' ? '?' : '!', positionX + (this.size.x + 3 / 2) / 2, positionY - offset);

      /* font */
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText(this.constructor.name === 'Npc' ? '?' : '!', positionX + this.size.x / 2, positionY - offset);
    }
  }

  drawExp(ctx: CanvasRenderingContext2D) {
    ctx.font = 'bold 10px auto';
    /* stroke */
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    const offset = 30;
    const height = 10;

    const calcExp = this.exp / this.maxExp;
    const text = `${(calcExp * 100).toFixed(2)}% (${this.exp}/${this.maxExp})`;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.strokeRect(innerWidth * 0.05, innerHeight - offset, innerWidth * 0.9, height);

    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 6;
    ctx.strokeRect(innerWidth * 0.05, innerHeight - offset, innerWidth * 0.9, height);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(innerWidth * 0.05, innerHeight - offset, innerWidth * 0.9, height);

    ctx.fillStyle = 'gray';
    ctx.fillRect(innerWidth * 0.05, innerHeight - offset, innerWidth * 0.9, height);

    ctx.fillStyle = '#f5ff8e';
    ctx.fillRect(innerWidth * 0.05, innerHeight - offset, calcExp * innerWidth * 0.9, height);

    ctx.fillStyle = '#000000';
    /* font */
    ctx.textAlign = 'center';
    ctx.fillText(text, innerWidth / 2, innerHeight - height * 2 - 2);
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
    const offset = 30;

    const useLevel = ['Monster', 'Player'].includes(this.constructor.name);
    const text = useLevel ? `Lv.${this.level} ${this.name}` : this.name;

    ctx.strokeText(text, positionX + this.size.x / 2, positionY - offset);

    /* font */
    ctx.textAlign = 'center';
    ctx.fillText(text, positionX + this.size.x / 2, positionY - offset);
  }

  drawHealth(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;
    ctx.font = 'bold 16px auto';

    /* stroke */
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    const offset = 10;

    if (this.isControlUnit) {
      ctx.fillStyle = 'gray';
      ctx.fillRect((innerWidth * 0.1) / 2, innerHeight - 20 - offset - 30, 150, 20);

      ctx.fillRect((innerWidth * 0.1) / 2, innerHeight - 20 - offset - 52, 150, 20);

      ctx.fillStyle = 'blue';
      ctx.fillRect((innerWidth * 0.1) / 2, innerHeight - 20 - offset - 30, (this.mp / this.maxMp) * 150, 20);

      ctx.fillStyle = 'red';
      ctx.fillRect((innerWidth * 0.1) / 2, innerHeight - 20 - offset - 52, (this.hp / this.maxHp) * 150, 20);

      ctx.font = 'bold 12px auto';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(`${this.hp} / ${this.maxHp}`, (innerWidth * 0.1) / 2 + 150 / 2, innerHeight - 20 - offset - 52 + 14);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${this.mp} / ${this.maxMp}`, (innerWidth * 0.1) / 2 + 150 / 2, innerHeight - 20 - offset - 32 + 16);
    } else {
      ctx.fillStyle = 'gray';
      ctx.fillRect(positionX, positionY - 22, this.size.x, 5);
      ctx.fillRect(positionX, positionY - 22 + 5, this.size.x, 5);

      ctx.fillStyle = 'red';
      ctx.fillRect(positionX, positionY - 22, (this.hp / this.maxHp) * this.size.x, 5);

      ctx.fillStyle = 'blue';
      ctx.fillRect(positionX, positionY - 22 + 5, (this.maxMp === 0 ? 1 : this.mp / this.maxMp) * this.size.x, 5);
    }
  }

  drawCharacter(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis) {
    // ctx.fillStyle = this.unitColor;
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;

    const frame = this.state === UnitState.Idle ? 0 : Math.floor((this.frame / (this.FPS * this.frameLate)) % this.limitFrame);
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

  isBlockedMove() {
    return this.taskQueue.some((task) => ['move', 'changeMap'].includes(task));
  }

  isBlockedAll() {
    return this.taskQueue.includes('changeMap');
  }

  isAttacking() {
    return this.taskQueue.includes('attack');
  }

  addConstraint(constraint: string) {
    this.taskQueue.push(constraint);
  }

  deleteConstraint(constraint: string) {
    this.taskQueue = this.taskQueue.filter((task) => task !== constraint);
  }

  rangeInAttack(unit: Unit) {
    const range = this.getDistance(unit);
    return range < this.totalAttackRange;
  }

  attack(monster: Unit & Monster): void {
    if (this.isAttacking()) return;
    if (!this.rangeInAttack(monster)) return;
    const damage = this.damage;
    monster.decreaseHp(damage);
    if (monster.isDead) {
      this.engine.removeUnit(monster);
      if (monster.constructor.name === 'Monster') {
        const exp = (monster as Monster).reward.getExp();
        const gold = (monster as Monster).reward.getGold();
        const item = (monster as Monster).reward.getItem();
        if (item) {
          this.inventory.addItem(item);
        }
        this.gold += gold;
        this.addExp(exp);
        monster.boundary = null;
        monster.state = UnitState.Die;
        setTimeout(() => {
          monster.position.x = monster.initPosition.x;
          monster.position.y = monster.initPosition.y;
          monster.hp = monster.maxHp;
          monster.mp = monster.maxMp;
          this.engine.addMonster(monster);
          monster.state = UnitState.Idle;
        }, monster.respawnTime * 1000);
      }
    }
    this.addConstraint('attack');
    setTimeout(() => {
      this.deleteConstraint('attack');
    }, this.attackSpeed * 1000);

    const getPosition = (): XY => {
      const posX = this.engine.renderer.controlUnit?.position.x || 0;
      const posY = this.engine.renderer.controlUnit?.position.y || 0;
      const { rangeX, rangeY } = this.engine.renderer.getCameraMoveableRange(posX, posY);

      const worldAxisX = this.engine.renderer.worldAxisX - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.X / 2 - posX + rangeX;
      const worldAxisY = this.engine.renderer.worldAxisY - GAME_CONF.UNIT_CONF.DEFAULT.SIZE.Y / 2 - posY + rangeY;

      const moveScreenX = monster.position.x;
      const moveScreenY = monster.position.y;
      const positionX = worldAxisX + moveScreenX;
      const positionY = worldAxisY + moveScreenY;
      return {
        x: positionX,
        y: positionY,
      };
    };

    const fx = hitCountEffect(damage.toString(), monster, getPosition.bind(this), 1, [this.hitColor, '#ffffff']);
    fx.run();
  }

  decreaseHp(amount: number): void {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      // this.state = UnitState.Die;
    }
  }

  decreaseMp(amount: number): void {
    this.mp -= amount;
    if (this.mp <= 0) {
      this.mp = 0;
    }
  }
}

export default Unit;
