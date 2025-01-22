import UseReward from '@model/unit/implement/UseReward';
import Reward from './Reward';
import Item from '@model/unit/object/Item';
export default class Quest implements UseReward {
    id: `quest-${string}`;
    title: string;
    content: string[];
    reward: Reward;
    setRewardGold(gold: number): void;
    setRewardExp(exp: number): void;
    setRewardItem(item: Item): void;
    getReward(): Reward;
    getGold(): number;
    getExp(): number;
    getItem(): Item | null;
}
