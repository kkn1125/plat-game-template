import GameEngine from '@core/GameEngine';
import Logger from '@util/Logger';
import { gameStart, initializeGameMap } from './setting/gameStart';

const logger = new Logger();
const gameEngine = new GameEngine();

gameStart(gameEngine);
initializeGameMap(gameEngine);
