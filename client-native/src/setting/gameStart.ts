import Renderer from '@animation/Renderer';
import UserInterface from '@animation/UserInterface';
import GameEngine from '@core/GameEngine';
import GameMapManager from '@core/GameMapManager';
import EventManager from '@event/EventManager';
import GameMap from '@model/gamemap/GameMap';
import { Town1 } from '@store/maps';
import Logger from '@util/Logger';
import { GameMode, GameState } from '@variable/constant';

const logger = new Logger('GameStart');

export function gameStart(gameEngine: GameEngine) {
  /* load */
  gameEngine.loadGameMapManager(new GameMapManager(gameEngine));
  gameEngine.loadEventManager(new EventManager(gameEngine));
  emitEvent(gameEngine);
  gameEngine.loadUi(new UserInterface(gameEngine));
  gameEngine.loadRenderer(new Renderer(gameEngine));

  gameEngine.setState(GameState.Loading);
  gameEngine.playMode(GameMode.Single);
  gameEngine.renderer.render();
}

export function initializeGameMap(gameEngine: GameEngine) {
  gameEngine.gameMapManager.addGameMap(Town1);
}

export function emitEvent(gameEngine: GameEngine) {
  //
  gameEngine.eventManager.watch({
    update(subject) {
      logger.log(gameEngine.state);
    },
  });
}
