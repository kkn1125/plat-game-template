import GameEngine from '@core/GameEngine';
import { Unit } from '@model/unit';
import Logger from '@util/Logger';
import { gameStart, initializeGameMap } from './setting/gameStart';
import { MD } from '@store/npc/MD';
import { MD2 } from '@store/npc/MD2';

const logger = new Logger();
const gameEngine = new GameEngine();

gameStart(gameEngine);
initializeGameMap(gameEngine);

gameEngine.addUnit(MD);
gameEngine.addUnit(MD2);

// gameEngine.singlePlay();
// gameEngine.multiPlay();

// logger.log(user);
// logger.log(user.hp);
