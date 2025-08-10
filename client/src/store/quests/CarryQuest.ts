import Quest from "@model/option/Quest";
import Reward from "@model/option/Reward";
import { LongSword } from "@store/items/weapon/Sword";

const CarryQuest = new Quest(
  "중요한 물건 찾기",
  [
    "저... 저기요... 혹시 도와주실 수 있나요?",
    "연못 옆에서 아주 중요한 반지를 떨어뜨렸어요...",
    "그건 제 것이 아니라 윗분의 소중한 물건이에요.",
    "만약 못 찾으면... 저는 정말 큰일날 것 같아요.",
    "작고 반짝이는 은반지인데, 연못 근처 어디선가 떨어진 것 같아요.",
    "정말 죄송하지만... 혹시 찾아주실 수 있을까요?",
  ],
  new Reward(100, 100, LongSword)
);

export { CarryQuest };
