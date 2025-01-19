import { GameCore } from "@model/index";
import { atom } from "recoil";

const gameMapAtom = atom({
  key: "gameMapAtom",
  default: new GameCore(),
  dangerouslyAllowMutability: true,
});

export default gameMapAtom;
