import GameEngine from '@core/GameEngine';
import { Unit } from '@model/unit';
import Logger from '@util/Logger';
import { gameStart, initializeGameMap } from './setting/gameStart';
import { MD } from '@store/npc/MD';
import { MD2 } from '@store/npc/MD2';
import { PortalTown1Town2 } from '@store/portal/Town1.Town2';
import textEffect from '@animation/effect/TextEffect';

const logger = new Logger();
const gameEngine = new GameEngine();

gameStart(gameEngine);
initializeGameMap(gameEngine);
// gameEngine.singlePlay();
// gameEngine.multiPlay();

// logger.log(user);
// logger.log(user.hp);
