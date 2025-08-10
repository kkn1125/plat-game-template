import Quest from "@model/option/Quest";

export default abstract class UseQuest {
  abstract quests: Quest[];
  abstract addQuest: (quest: Quest) => void;
}
