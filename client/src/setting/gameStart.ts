import Renderer from "@animation/Renderer";
import UserInterface from "@animation/UserInterface";
import GameEngine from "@core/GameEngine";
import GameMapManager from "@core/GameMapManager";
import { AudioManager } from "@engine/audio/AudioManager";
import EventManager from "@event/EventManager";
import { BuildingEmptyHouse } from "@store/buildings/BuildingEmptyHouse";
import { BuildingGMHouse } from "@store/buildings/BuildingGMHouse";
import maps, { ForestRoad1, Taecho } from "@store/maps";
import { SlimeFactory } from "@store/monster/Slime";
import npcs from "@store/npc";
import portals from "@store/portal";
import Logger from "@util/Logger";
import { GameState } from "@variable/constant";

const logger = new Logger("GameStart");

export function gameStart(gameEngine: GameEngine) {
  /* init */
  const audioManager = new AudioManager();
  gameEngine.audioManager = audioManager;

  const gameMapManager = new GameMapManager(gameEngine);
  gameEngine.loadGameMapManager(gameMapManager);

  Object.values(maps).forEach((map) => {
    gameEngine.gameMapManager.addGameMap(map);
  });
  gameEngine.gameMapManager.setCurrentMap(Taecho);

  /* load */
  const eventManager = new EventManager(gameEngine);
  gameEngine.loadEventManager(eventManager);
  emitEvent(gameEngine);

  const ui = new UserInterface(gameEngine);
  gameEngine.loadUi(ui);
  const renderer = new Renderer(gameEngine);
  gameEngine.loadRenderer(renderer);

  gameEngine.setState(GameState.Init);
}

export function initializeGameMap(gameEngine: GameEngine) {
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: 2, y: 3 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: 7, y: 5 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: -2, y: -3 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: -0, y: -10 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: 12, y: 4 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: 12, y: 10 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: -12, y: 10 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: -12, y: -6 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: -12, y: 0 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: -11, y: 1.5 }));
  gameEngine.addMonster(SlimeFactory(maps.Osolgil1, { x: -9, y: -3.5 }));

  Object.values(npcs).forEach((npc) => {
    gameEngine.addNpc(npc);
  });

  Object.values(portals).forEach((portal) => {
    gameEngine.addPortal(portal);
  });

  gameEngine.addBuilding(BuildingGMHouse);
  gameEngine.addBuilding(BuildingEmptyHouse);
}

export function emitEvent(gameEngine: GameEngine) {
  //
  gameEngine.eventManager.watch({
    update(subject) {
      logger.log(gameEngine.state);
    },
  });
}
