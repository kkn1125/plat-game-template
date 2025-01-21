import GameEngine from '@core/GameEngine';
import Logger from '@util/Logger';
import { gameStart, initializeGameMap } from './setting/gameStart';
import { GameMode } from '@variable/constant';

const logger = new Logger();
const gameEngine = new GameEngine();
gameEngine.gameMode = GameMode.Test;

gameStart(gameEngine);
initializeGameMap(gameEngine);
