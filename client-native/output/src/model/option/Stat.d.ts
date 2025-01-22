import Unit from "../unit/Unit";
import Item from "../unit/object/Item";
type StatKey = Extract<keyof Stat, "str" | "dex" | "int" | "luk">;
export default class Stat {
    static readonly DefaultPoint = 5;
    parent: Unit | Item;
    statPoint: number;
    str: number;
    dex: number;
    int: number;
    luk: number;
    constructor(parent: Unit | Item);
    get damage(): number;
    increaseStatPoint(): void;
    statUp(state: StatKey, amount: number): void;
    statClear(): void;
}
export {};
