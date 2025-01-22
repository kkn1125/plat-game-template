import GAME_CONF from "@config/game.conf";
class Stat {
    constructor(parent) {
        Object.defineProperty(this, "parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "statPoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "str", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.STR
        });
        Object.defineProperty(this, "dex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.DEX
        });
        Object.defineProperty(this, "int", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.INT
        });
        Object.defineProperty(this, "luk", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GAME_CONF.UNIT_CONF.DEFAULT.LUCK
        });
        this.parent = parent;
    }
    get damage() {
        return this.str + this.dex;
    }
    increaseStatPoint() {
        // 불변값으로 추가 (에러 가능성을 고려하여 인자 제거)
        this.statPoint += Stat.DefaultPoint;
    }
    statUp(state, amount) {
        this[state] += amount;
    }
    statClear() {
        this.str = GAME_CONF.UNIT_CONF.DEFAULT.STR;
        this.dex = GAME_CONF.UNIT_CONF.DEFAULT.DEX;
        this.int = GAME_CONF.UNIT_CONF.DEFAULT.INT;
        this.luk = GAME_CONF.UNIT_CONF.DEFAULT.LUCK;
    }
}
Object.defineProperty(Stat, "DefaultPoint", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 5
});
export default Stat;
