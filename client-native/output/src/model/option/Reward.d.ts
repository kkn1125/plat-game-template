import Item from '@model/unit/object/Item';
export default class Reward {
    exp: number;
    gold: number;
    item: Item | null;
    constructor();
    setItem(item: Item): void;
    setExp(exp: number): void;
    setGold(gold: number): void;
    getExp(): number;
    getGold(): number;
    getItem(): Item | null;
}
