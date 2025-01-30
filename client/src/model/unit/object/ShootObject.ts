import GAME_CONF from "@config/game.conf";
import Monster from "../monster/Monster";
import Unit from "../Unit";
import ItemShootableWeapon from "./ItemShootableWeapon";

export default class ShootObject extends Unit {
  parent!: ItemShootableWeapon;

  targetPosition: XY = {
    x: 0,
    y: 0,
  };

  shootingDistance: number = GAME_CONF.MAP_CONF.DEFAULT.SIZE.X * 3;
  shootingSpeed: number = 1;

  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.hp = Infinity;
    this.mp = Infinity;
    this.maxHp = Infinity;
    this.maxMp = Infinity;
    this.size.x = 10;
    this.size.y = 10;
  }

  get parentUnit(): Unit {
    return this.parent.unit;
  }

  get damage() {
    return this.parentUnit.damage;
  }

  setParent(item: ItemShootableWeapon) {
    this.parent = item;
  }

  setShootingSpeed(shootingSpeed: number) {
    this.shootingSpeed = shootingSpeed;
  }

  setShootingDistance(shootingDistance: number) {
    this.shootingDistance =
      GAME_CONF.MAP_CONF.DEFAULT.SIZE.X * shootingDistance;
  }

  setShootingAttackRange(shootingAttackRange: number) {
    this.attackRange = shootingAttackRange;
  }

  trace() {
    // console.log("trace");
    const diffX = this.targetPosition.x - this.position.x;
    const diffY = this.targetPosition.y - this.position.y;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    const speed = this.shootingSpeed;
    const moveX = (diffX / distance) * speed;
    const moveY = (diffY / distance) * speed;
    this.position.x += moveX;
    this.position.y += moveY;
    if (distance < speed) {
      this.engine.removeObject(this);
      if (this.closeUnit) {
        this.attack(this.closeUnit as Monster);
      }
      // this.die();
    }

    const diffX2 = this.parent.unit.position.x - this.position.x;
    const diffY2 = this.parent.unit.position.y - this.position.y;
    const distance2 = Math.sqrt(diffX2 * diffX2 + diffY2 * diffY2);

    if (this.shootingDistance < distance2) {
      this.engine.removeObject(this);
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    labelCtx: CanvasRenderingContext2D,
    { worldAxisX, worldAxisY }: WorldAxis
  ) {
    const moveScreenX = this.position.x;
    const moveScreenY = this.position.y;
    const positionX = worldAxisX + moveScreenX;
    const positionY = worldAxisY + moveScreenY;

    this.around();

    // this.drawName(labelCtx, { worldAxisX, worldAxisY });

    // ctx.fillStyle = "red";

    // if (this.aroundUnits.length > 0) {
    //   ctx.fillStyle = "red";
    // } else {
    //   ctx.fillStyle = "blue";
    // }
    // ctx.fillRect(positionX, positionY, this.size.x, this.size.y);

    ctx.fillStyle = "#777777";
    ctx.beginPath();
    ctx.arc(
      positionX + this.size.x / 2,
      positionY + this.size.y / 2,
      this.size.x / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}
