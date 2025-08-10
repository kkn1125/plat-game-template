import ItemWeapon from "@model/unit/object/ItemWeapon";
import { ItemType } from "@variable/constant";

export const LongSword = new ItemWeapon("longSword");
LongSword.defaultDamage = 20;
LongSword.attackSpeed = 0.7;
LongSword.type = ItemType.Weapon;
