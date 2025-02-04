import Quest from "@model/option/Quest";
import { Npc } from "..";
import UseQuest from "../implement/UseQuest";

export default class QuestNpc extends Npc implements UseQuest {
  quest: Quest[] = [];

  addQuest(quest: Quest) {
    this.quest.push(quest);
  }
}
