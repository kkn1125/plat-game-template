import { gameStart, initializeGameMap } from "@/setting/gameStart";
import GameEngine from "@core/GameEngine";

const gameEngine = new GameEngine();

gameStart(gameEngine);
initializeGameMap(gameEngine);

export default gameEngine;
