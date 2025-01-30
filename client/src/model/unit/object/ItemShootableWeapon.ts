import { ItemType } from "@variable/constant";
import Monster from "../monster/Monster";
import Unit from "../Unit";
import ItemWeapon from "./ItemWeapon";
import ShootObject from "./ShootObject";

export default class ItemShootableWeapon extends ItemWeapon {
  shootingSpeed: number = 1;
  shootingDistance: number = 3;
  shootingAttackRange: number = 20;

  constructor(name: string) {
    super(name);
    this.type = ItemType.Weapon;
  }

  shooting(monster: Unit & Monster) {
    const object = new ShootObject(this.name);
    this.engine.addObject(object);
    object.setPosition(
      this.unit.position.x + this.unit.size.x / 2,
      this.unit.position.y + this.unit.size.y / 2
    );
    object.targetPosition.x = monster.position.x + monster.size.x / 2;
    object.targetPosition.y = monster.position.y + monster.size.y / 2;
    object.location.locate = monster.location.locate;
    object.setParent(this);
    object.setShootingSpeed(this.shootingSpeed);
    object.setShootingDistance(this.shootingDistance);
    object.setShootingAttackRange(this.shootingAttackRange);
  }

  attack(monster: Unit & Monster) {
    if (this.unit.isAttacking()) return;
    this.shooting(monster);
    this.unit.addConstraint("attack");
    setTimeout(() => {
      this.unit.deleteConstraint("attack");
    }, this.unit.attackLatestSpeed * 1000);
  }
}
