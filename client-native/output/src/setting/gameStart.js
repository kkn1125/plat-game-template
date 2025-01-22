import Renderer from '@animation/Renderer';
import UserInterface from '@animation/UserInterface';
import GameMapManager from '@core/GameMapManager';
import EventManager from '@event/EventManager';
import { Town1, Town2 } from '@store/maps';
import { MD } from '@store/npc/MD';
import { MD2 } from '@store/npc/MD2';
import { PortalTown1Town2 } from '@store/portal/Town1.Town2';
import { PortalTown2Town1 } from '@store/portal/Town2.Town1';
import Logger from '@util/Logger';
import { GameMode, GameState } from '@variable/constant';
const logger = new Logger('GameStart');
export function gameStart(gameEngine) {
    /* init */
    const gameMapManager = new GameMapManager(gameEngine);
    gameEngine.loadGameMapManager(gameMapManager);
    gameEngine.gameMapManager.addGameMap(Town2);
    gameEngine.gameMapManager.addGameMap(Town1);
    gameEngine.gameMapManager.setCurrentMap(Town2);
    /* load */
    const eventManager = new EventManager(gameEngine);
    gameEngine.loadEventManager(eventManager);
    emitEvent(gameEngine);
    const ui = new UserInterface(gameEngine);
    gameEngine.loadUi(ui);
    const renderer = new Renderer(gameEngine);
    gameEngine.loadRenderer(renderer);
    gameEngine.setState(GameState.Loading);
    gameEngine.playMode(GameMode.Single);
    gameEngine.renderer.render();
}
export function initializeGameMap(gameEngine) {
    gameEngine.addUnit(MD);
    gameEngine.addUnit(MD2);
    gameEngine.addPortal(PortalTown1Town2);
    gameEngine.addPortal(PortalTown2Town1);
}
export function emitEvent(gameEngine) {
    //
    gameEngine.eventManager.watch({
        update(subject) {
            logger.log(gameEngine.state);
        },
    });
}
