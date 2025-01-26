import { UnitState } from '@variable/constant';
import AutoMoveable from '../implement/AutoMoveable';
import Unit from '../Unit';
import GAME_CONF from '@config/game.conf';
import Npc from '../npc/Npc';
import Portal from '../portal/Portal';
import Reward from '@model/option/Reward';
import UseReward from '../implement/UseReward';

export default class Monster extends Unit implements AutoMoveable, UseReward {
  state = 'Idle';
  dir = true;
  passable = true;
  respawnTime: number = GAME_CONF.MONSTER_CONF.DEFAULT.RESPAWN_TIME;
  reward: Reward = new Reward();

  routine!: (unit: Unit) => void;

  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.hitColor = '#ff0000';
    setInterval(() => {
      const zeroBack = Math.floor(Math.random() * (100 + 1));
      // console.log(state, zeroBack);
      if (zeroBack < 50) {
        this.state = 'Move';
      }
    }, 2000);

    this.detectRange = GAME_CONF.MONSTER_CONF.DEFAULT.DETECT_RANGE;
    this.attackRange = GAME_CONF.MONSTER_CONF.DEFAULT.ATTACK_RANGE;

    this.increaseSpeed = GAME_CONF.MONSTER_CONF.DEFAULT.INCREASE_SPEED;
    this.attackSpeed = GAME_CONF.MONSTER_CONF.DEFAULT.ATTACK_SPEED;
    this.size = {
      x: GAME_CONF.MONSTER_CONF.DEFAULT.SIZE.X,
      y: GAME_CONF.MONSTER_CONF.DEFAULT.SIZE.Y,
    };

    this.speed = GAME_CONF.MONSTER_CONF.DEFAULT.SPEED;
    this.attackSpeed = GAME_CONF.MONSTER_CONF.DEFAULT.ATTACK_SPEED;
    this.hp = GAME_CONF.MONSTER_CONF.DEFAULT.HP;
    this.mp = GAME_CONF.MONSTER_CONF.DEFAULT.MP;
    this.maxHp = GAME_CONF.MONSTER_CONF.DEFAULT.HP;
    this.maxMp = GAME_CONF.MONSTER_CONF.DEFAULT.MP;
    this.defaultDamage = GAME_CONF.MONSTER_CONF.DEFAULT.DAMAGE;

    this.initPosition = { x: this.position.x, y: this.position.y };
    this.originPosition = { x: this.position.x, y: this.position.y };

    this.routine = (unit) => {
      const { y } = unit.position;
      const { y: originY } = this.originPosition;
      const distance = Math.abs(y - originY);
      if (distance >= 50) {
        this.dir = !this.dir;
        this.state = 'Idle';
        this.originPosition = { ...unit.position };
        unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 'a');
        unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 'd');
        unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 'w');
        // unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 's');
        unit.engine.eventManager.joystickEvent.manualKeyUp(unit, 's');
        unit.state = UnitState.Idle;
      }
      if (this.state === 'Move') {
        if (this.dir) {
          unit.move(0, -1);
          unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 'w');
          unit.state = UnitState.Move;
        } else {
          unit.move(0, 1);
          unit.engine.eventManager.joystickEvent.manualKeyDown(unit, 's');
          unit.state = UnitState.Move;
        }
      }
    };
  }

  draw(ctx: CanvasRenderingContext2D, labelCtx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void {
    if (!this.boundary) {
      this.autoMove();
    } else {
      if (
        !(this.boundary instanceof Monster) &&
        !(this.boundary instanceof Portal) &&
        !(this.boundary instanceof Npc) &&
        this.boundary instanceof Unit &&
        this.boundary.isAlive &&
        this.state !== UnitState.Die
      ) {
        this.attack(this.boundary as Unit & Monster);
      }

      this.state = UnitState.Idle;

      const radians = Math.atan2(this.boundary.position.y - this.position.y, this.boundary.position.x - this.position.x);
      const value = parseInt(((radians / Math.PI) * 10 * 18 + 180).toString());

      if (this.boundary.position.x < this.position.x) {
        this.move(-this.increaseSpeed, 0);
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'a');
        this.state = UnitState.Move;
      }
      if (this.boundary.position.y < this.position.y) {
        this.move(0, -this.increaseSpeed);
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'w');
        this.state = UnitState.Move;
      }
      if (this.boundary.position.x > this.position.x) {
        this.move(this.increaseSpeed, 0);
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'd');
        this.state = UnitState.Move;
      }
      if (this.boundary.position.y > this.position.y) {
        this.move(0, this.increaseSpeed);
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 's');
        this.state = UnitState.Move;
      }
      // this.position.x += this.boundary.position.x;
      // this.position.y += this.boundary.position.y;

      if (45 >= value || value > 315) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'a');
      }

      if (45 < value && value <= 135) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'w');
      }

      if (135 < value && value <= 225) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 'd');
      }

      if (225 < value && value <= 315) {
        this.engine.eventManager.joystickEvent.manualKeyDown(this, 's');
      }
    }
    super.draw(ctx, labelCtx, { worldAxisX, worldAxisY });
  }

  setRoutine(routine: (unit: Unit) => void) {
    this.routine = routine;
  }

  autoMove() {
    this.routine?.(this);
  }
}
