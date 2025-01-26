import Renderer from '@animation/Renderer';
import UserInterface from '@animation/UserInterface';
import GameEngine from '@core/GameEngine';
import GameMapManager from '@core/GameMapManager';
import EventManager from '@event/EventManager';
import { BuildingEmptyHouse } from '@store/buildings/BuildingEmptyHouse';
import { BuildingMDHouse } from '@store/buildings/BuildingMDHouse';
import { MDHouse, Osolgil1, Taecho, TaechoFront } from '@store/maps';
import { EmptyHouse1 } from '@store/maps/EmptyHouse1';
import { SlimeFactory } from '@store/monster/Slime';
import { MD, MD2 } from '@store/npc';
import { Chonjang } from '@store/npc/Chonjang';
import { Mari } from '@store/npc/Mari';
import { AreaPortalMDHouseToTaecho } from '@store/portal';
import { AreaPortalEmptyHouse1ToTaecho } from '@store/portal/AreaPortalEmptyHouse1ToTaecho';
import { PortalFrontToTaecho } from '@store/portal/PortalFrontToTaecho';
import { PortalOsolgil1ToTaecho } from '@store/portal/PortalOsolgil1ToTaecho';
import { PortalTaechoToFront } from '@store/portal/PortalTaechoToFront';
import { PortalTaechoToOsolgil1 } from '@store/portal/PortalTaechoToOsolgil1';
import Logger from '@util/Logger';
import { GameState } from '@variable/constant';
import Socket from '@websocket/Socket';

const logger = new Logger('GameStart');

export function gameStart(gameEngine: GameEngine) {
  /* init */
  const gameMapManager = new GameMapManager(gameEngine);
  gameEngine.loadGameMapManager(gameMapManager);
  gameEngine.gameMapManager.addGameMap(Taecho);
  gameEngine.gameMapManager.addGameMap(TaechoFront);
  gameEngine.gameMapManager.addGameMap(Osolgil1);
  gameEngine.gameMapManager.addGameMap(EmptyHouse1);
  gameEngine.gameMapManager.addGameMap(MDHouse);
  gameEngine.gameMapManager.setCurrentMap(Taecho);

  /* load */
  const eventManager = new EventManager(gameEngine);
  gameEngine.loadEventManager(eventManager);
  emitEvent(gameEngine);

  const socket = new Socket(gameEngine);
  gameEngine.loadSocket(socket);

  const ui = new UserInterface(gameEngine);
  gameEngine.loadUi(ui);
  const renderer = new Renderer(gameEngine);
  gameEngine.loadRenderer(renderer);

  gameEngine.setState(GameState.Loading);
  gameEngine.renderer.render();
}

export function initializeGameMap(gameEngine: GameEngine) {
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: 2, y: 3 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: 7, y: 5 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: -2, y: -3 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: -0, y: -10 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: 12, y: 4 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: 12, y: 10 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: -12, y: 10 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: -12, y: -6 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: -12, y: 0 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: -11, y: 1.5 }));
  gameEngine.addMonster(SlimeFactory(Osolgil1, { x: -9, y: -3.5 }));

  gameEngine.addNpc(MD);
  gameEngine.addNpc(MD2);
  gameEngine.addNpc(Chonjang);
  gameEngine.addNpc(Mari);

  gameEngine.addPortal(PortalTaechoToFront);
  gameEngine.addPortal(PortalFrontToTaecho);
  gameEngine.addPortal(PortalTaechoToOsolgil1);
  gameEngine.addPortal(PortalOsolgil1ToTaecho);
  gameEngine.addPortal(AreaPortalEmptyHouse1ToTaecho);
  gameEngine.addPortal(AreaPortalMDHouseToTaecho);

  gameEngine.addBuilding(BuildingMDHouse);
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
