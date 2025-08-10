import Quest from "@model/option/Quest";
import { Npc } from "..";
import UseQuest from "../implement/UseQuest";

export default class QuestNpc extends Npc implements UseQuest {
  quests: Quest[] = [];

  addQuest(quest: Quest) {
    quest.setNpc(this);
    this.quests.push(quest);
  }
}
