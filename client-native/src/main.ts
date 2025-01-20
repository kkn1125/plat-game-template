import GameEngine from '@core/GameEngine';
import { Unit } from '@model/unit';
import Logger from '@util/Logger';
import { gameStart, initializeGameMap } from './setting/gameStart';
import { MD } from '@store/npc/MD';

const logger = new Logger();
const gameEngine = new GameEngine();

gameStart(gameEngine);
initializeGameMap(gameEngine);

const user3 = new Unit('test-user2');
user3.setPosition(150, -150);

gameEngine.addUnit(MD);
gameEngine.addUnit(user3);

// gameEngine.singlePlay();
// gameEngine.multiPlay();

// logger.log(user);
// logger.log(user.hp);
