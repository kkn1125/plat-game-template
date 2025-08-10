import { Npc } from "@model/unit";
import UseReward from "@model/unit/implement/UseReward";
import Item from "@model/unit/object/Item";
import { makeId } from "@util/makeId";
import { makeObservable } from "mobx";
import Reward from "./Reward";

export default class Quest implements UseReward {
  npc!: Npc;

  id = makeId("quest");

  title!: string;
  content: string[] = [];

  reward: Reward;

  constructor(title: string, content: string[], reward: Reward) {
    this.title = title;
    this.content = content;
    this.reward = reward;

    makeObservable(this);
  }

  getNpc() {
    return this.npc;
  }

  getTitle() {
    return this.title;
  }

  getContent() {
    return this.content;
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

  setNpc(npc: Npc) {
    this.npc = npc;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setContent(content: string[]) {
    this.content = content;
  }

  setReward(reward: Reward) {
    this.reward = reward;
  }

  setRewardGold(gold: number) {
    this.reward.setGold(gold);
  }

  setRewardExp(exp: number) {
    this.reward.setExp(exp);
  }

  setRewardItem(item: Item) {
    this.reward.setItem(item);
  }
}
