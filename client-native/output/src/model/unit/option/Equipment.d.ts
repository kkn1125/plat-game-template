import Item from "../object/Item";
import Unit from "../Unit";
export default class Equipment {
    parent: Unit;
    head: Item | null;
    hand: Item | null;
    ring: Item | null;
    weapon: Item | null;
    body: Item | null;
    pants: Item | null;
    foot: Item | null;
    constructor(parent: Unit);
    equip(item: Item): void;
    unequip(item: Item): void;
    drop(item: Item): void;
}
