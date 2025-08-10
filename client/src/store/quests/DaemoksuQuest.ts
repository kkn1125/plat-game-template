import Quest from "@model/option/Quest";
import Reward from "@model/option/Reward";

const DaemoksuQuest = new Quest(
  "나무꾼 하나 못 봤어?",
  [
    "나무꾼 하나 못 봤어?",
    "이놈 또 어디서 놀고 있는 거야?",
    "그놈은 원래 성실한 일꾼이었는데 요즘 들어 자꾸 자리를 비워.",
  ],
  new Reward(100, 100, null)
);

export { DaemoksuQuest };
