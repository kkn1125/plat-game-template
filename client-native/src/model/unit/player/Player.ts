import { makeId } from '@util/makeId';
import Unit from '../Unit';
import UseEquipment from '../implement/UseEquipment';
import Equipment from '@model/option/Equipment';
import Inventory from '@model/option/Inventory';
import { Gun } from '@store/items/weapon/Gun';

export default class Player extends Unit implements UseEquipment {
  constructor(name: string, option?: HealthOption) {
    super(name, option);
    this.id = makeId('player');

    this.inventory.addItem(Gun);
  }
}
