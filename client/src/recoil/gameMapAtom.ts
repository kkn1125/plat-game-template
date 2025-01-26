import { gameStart, initializeGameMap } from "@/setting/gameStart";
import GameEngine from "@core/GameEngine";
import { atom } from "recoil";

const gameEngine = new GameEngine();

gameStart(gameEngine);
initializeGameMap(gameEngine);


const gameMapAtom = atom({
  key: "gameMapAtom",
  default: gameEngine,
  dangerouslyAllowMutability: true,
});

export default gameMapAtom;
