import Renderer from '@animation/Renderer';
import UserInterface from '@animation/UserInterface';
import GameEngine from '@core/GameEngine';
import GameMapManager from '@core/GameMapManager';
import EventManager from '@event/EventManager';
import GameMap from '@model/gamemap/GameMap';
import { Town1, Town2 } from '@store/maps';
import { MD } from '@store/npc/MD';
import { MD2 } from '@store/npc/MD2';
import { PortalTown1Town2 } from '@store/portal/Town1.Town2';
import { PortalTown2Town1 } from '@store/portal/Town2.Town1';
import Logger from '@util/Logger';
import { GameMode, GameState } from '@variable/constant';

const logger = new Logger('GameStart');

export function gameStart(gameEngine: GameEngine) {
  /* init */
  const gameMapManager = new GameMapManager(gameEngine);
  const eventManager = new EventManager(gameEngine);
  const ui = new UserInterface(gameEngine);
  const renderer = new Renderer(gameEngine);

  /* load */
  gameEngine.loadGameMapManager(gameMapManager);
  gameEngine.loadEventManager(eventManager);
  emitEvent(gameEngine);
  gameEngine.loadUi(ui);
  gameEngine.loadRenderer(renderer);

  gameEngine.setState(GameState.Loading);
  gameEngine.playMode(GameMode.Single);
  gameEngine.renderer.render();
}

export function initializeGameMap(gameEngine: GameEngine) {
  gameEngine.gameMapManager.addGameMap(Town2);
  gameEngine.gameMapManager.addGameMap(Town1);

  gameEngine.addUnit(MD);
  gameEngine.addUnit(MD2);

  gameEngine.addPortal(PortalTown1Town2);
  gameEngine.addPortal(PortalTown2Town1);
}

export function emitEvent(gameEngine: GameEngine) {
  //
  gameEngine.eventManager.watch({
    update(subject) {
      logger.log(gameEngine.state);
    },
  });
}
