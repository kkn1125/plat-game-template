import ItemShootableWeapon from "@model/unit/object/ItemShootableWeapon";
import { ItemType } from "@variable/constant";

export const Gun = new ItemShootableWeapon("gun");
Gun.defaultDamage = 1;
Gun.attackSpeed = 0.2;
Gun.type = ItemType.Weapon;
Gun.range = 200;
Gun.shootingSpeed = 10;
Gun.shootingDistance = 5;
Gun.shootingAttackRange = 20;
