export default class Reward {
    constructor() {
        Object.defineProperty(this, "exp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "gold", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "item", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
    setItem(item) {
        this.item = item;
    }
    setExp(exp) {
        this.exp = exp;
    }
    setGold(gold) {
        this.gold = gold;
    }
    getExp() {
        return this.exp;
    }
    getGold() {
        return this.gold;
    }
    getItem() {
        return this.item;
    }
}
