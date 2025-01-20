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
