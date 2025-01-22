import UseReward from '@model/unit/implement/UseReward';
import { makeId } from '@util/makeId';
import Reward from './Reward';
import Item from '@model/unit/object/Item';

export default class Quest implements UseReward {
  id = makeId('quest');

  title!: string;
  content: string[] = [];

  reward: Reward = new Reward();

  setRewardGold(gold: number) {
    this.setRewardGold(gold);
  }

  setRewardExp(exp: number) {
    this.setRewardExp(exp);
  }

  setRewardItem(item: Item) {
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
