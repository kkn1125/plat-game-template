import { makeId } from '@util/makeId';
import Reward from './Reward';
export default class Quest {
    constructor() {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: makeId('quest')
        });
        Object.defineProperty(this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "reward", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Reward()
        });
    }
    setRewardGold(gold) {
        this.setRewardGold(gold);
    }
    setRewardExp(exp) {
        this.setRewardExp(exp);
    }
    setRewardItem(item) {
        this.setRewardItem(item);
    }
    getReward() {
        return this.reward;
    }
    getGold() {
        return this.reward.getGold();
    }
    getExp() {
        return this.reward.getExp();
    }
    getItem() {
        return this.reward.getItem();
    }
}
