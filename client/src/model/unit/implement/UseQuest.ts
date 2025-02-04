import Quest from "@model/option/Quest";

export default abstract class UseQuest {
  abstract quest: Quest[];
  abstract addQuest: (quest: Quest) => void;
}
