import GameEngine from '@core/GameEngine';
import { Unit } from '@model/unit';
import Logger from '@util/Logger';
import { gameStart, initializeGameMap } from './setting/gameStart';

const logger = new Logger();
const gameEngine = new GameEngine();

gameStart(gameEngine);
initializeGameMap(gameEngine);

const user = new Unit('test-user');
const user2 = new Unit('test-user2');
const user3 = new Unit('test-user2');
user2.unitColor = 'yellow';
user3.position.x = 100;
gameEngine.setControlUnit(user);
// gameEngine.addUnit(user);
gameEngine.addUnit(user2);
gameEngine.addUnit(user3);

// gameEngine.singlePlay();
// gameEngine.multiPlay();

// logger.log(user);
// logger.log(user.hp);
