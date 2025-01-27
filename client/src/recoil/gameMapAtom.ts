import { gameStart, initializeGameMap } from "@/setting/gameStart";
import GameEngine from "@core/GameEngine";
import { autorun } from "mobx";
import { atom } from "recoil";

const gameEngine = new GameEngine();

gameStart(gameEngine);
initializeGameMap(gameEngine);

// autorun(() => {
//   console.log(gameEngine.controlUnit?.gold);
// });

export default gameEngine;

// const gameMapAtom = atom({
//   key: "gameMapAtom",
//   default: gameEngine,
//   dangerouslyAllowMutability: true,
// });

// export default gameMapAtom;
