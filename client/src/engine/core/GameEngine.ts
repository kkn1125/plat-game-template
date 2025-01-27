import Renderer from "@animation/Renderer";
import UserInterface from "@animation/UserInterface";
import GAME_CONF from "@config/game.conf";
import EventManager from "@event/EventManager";
import { Monster, Npc, Unit } from "@model/unit";
import Building from "@model/unit/building/Building";
import Item from "@model/unit/object/Item";
import Player from "@model/unit/player/Player";
import Portal from "@model/unit/portal/Portal";
import { Taecho } from "@store/maps";
import Logger from "@util/Logger";
import { GameMode, GameState, ItemState } from "@variable/constant";
import { globalChannel } from "@variable/globalControl";
import Socket from "@websocket/Socket";
import { makeAutoObservable } from "mobx";
import GameMapManager from "./GameMapManager";

export default class GameEngine {
  logger = new Logger<GameEngine>(this);

  state: GameState = GameState.Init;

  gameMode: GameMode = GAME_CONF.MODE;
  ui!: UserInterface;
  renderer!: Renderer;
  eventManager!: EventManager;
  gameMapManager!: GameMapManager;
  socket!: Socket;

  controlUnit: Player | null = null;

  units: Unit[] = [];
  players: Player[] = [];
  items: Item[] = [];
  monsters: Monster[] = [];
  npcs: Npc[] = [];
  portals: Portal[] = [];
  buildings: Building[] = [];

  get sameLocationUnits() {
    return this.units.filter(
      (unit) => this.gameMapManager.currentMap?.name === unit.location.locate
    );
  }

  get sameLocationPlayers() {
    return this.players.filter(
      (player) =>
        this.gameMapManager.currentMap?.name === player.location.locate
    );
  }

  get sameLocationMonsters() {
    return this.monsters.filter(
      (monster) =>
        this.gameMapManager.currentMap?.name === monster.location.locate
    );
  }

  get sameLocationItems() {
    return this.items.filter(
      (item) =>
        this.gameMapManager.currentMap?.name === item.location.locate &&
        item.state === ItemState.Drop
    );
  }

  get sameLocationNpcs() {
    return this.npcs.filter(
      (npc) => this.gameMapManager.currentMap?.name === npc.location.locate
    );
  }

  get sameLocationPortals() {
    return this.portals.filter(
      (portal) =>
        this.gameMapManager.currentMap?.name === portal.location.locate
    );
  }

  get sameLocationBuildings() {
    return this.buildings.filter(
      (building) =>
        this.gameMapManager.currentMap?.name === building.location.locate
    );
  }

  constructor() {
    this.logger.scope().debug("초기화 게임엔진 모드:", this.gameMode);
    makeAutoObservable(this);
  }

  removePlayerByName(id: any) {
    this.units = this.units.filter((unit) => unit.id !== id);
  }

  removeUnit(closeUnit: Unit | Item) {
    if (closeUnit instanceof Monster) {
      this.monsters = this.monsters.filter(
        (monster) => monster.id !== closeUnit.id
      );
    } else if (closeUnit instanceof Player) {
      this.players = this.players.filter(
        (player) => player.id !== closeUnit.id
      );
    } else if (closeUnit instanceof Npc) {
      this.npcs = this.npcs.filter((npc) => npc.id !== closeUnit.id);
    } else if (closeUnit instanceof Building) {
      this.buildings = this.buildings.filter(
        (building) => building.id !== closeUnit.id
      );
    } else if (closeUnit instanceof Portal) {
      this.portals = this.portals.filter(
        (portal) => portal.id !== closeUnit.id
      );
    } else if (closeUnit instanceof Item) {
      this.items = this.items.filter((item) => item.id !== closeUnit.id);
    } else {
      if (closeUnit.isControlUnit) {
        closeUnit.addConstraint("die");
        setTimeout(() => {
          closeUnit.deleteConstraint("die");
          closeUnit.hp = closeUnit.maxHp;
          closeUnit.mp = closeUnit.maxMp;
          this.gameMapManager.changeMap(Taecho);
          closeUnit.location.locate = Taecho.name;
          closeUnit.setPosition(
            Taecho.defaultSpawnPosition.x,
            Taecho.defaultSpawnPosition.y
          );
        }, GAME_CONF.UNIT_CONF.RESPAWN_TIME * 1000);
      }
      // this.units = this.units.filter((unit) => unit.id !== closeUnit.id);
    }
  }

  setControlUnit(unit: Player) {
    unit.unitColor = "red";
    this.controlUnit = unit;
    unit.setGameEngine(this);
    globalChannel.addUser(unit);
  }

  setState(state: GameState) {
    this.logger.scope("SetState").debug("게임 엔진 모드 변경:", state);
    this.state = state;
    this.eventManager.notify();
  }

  addUnit(unit: Unit) {
    this.logger.scope("AddUnit").debug("유닛 추가", unit.id);
    this.units.push(unit);
    unit.setGameEngine(this);
  }

  addPlayer(player: Player) {
    this.logger.scope("AddPlayer").debug("플레이어 추가", player.id);
    this.players.push(player);
    player.setGameEngine(this);
  }

  addItem(item: Item) {
    this.logger.scope("AddItem").debug("아이템 추가", item.id);
    this.items.push(item);
    item.setGameEngine(this);
  }

  addMonster(monster: Monster) {
    this.logger.scope("AddMonster").debug("몬스터 추가", monster.id);
    this.monsters.push(monster);
    monster.setGameEngine(this);
  }

  addNpc(npc: Npc) {
    this.logger.scope("AddNpc").debug("Npc 추가", npc.id);
    this.npcs.push(npc);
    npc.setGameEngine(this);
  }

  addPortal(portal: Portal) {
    this.logger.scope("AddPortal").debug("포탈 추가", portal.id);
    this.portals.push(portal);
    portal.setGameEngine(this);
  }

  addBuilding(building: Building) {
    this.logger.scope("AddBuilding").debug("빌딩 추가", building.id);
    this.buildings.push(building);
    building.setGameEngine(this);
  }

  loadSocket(socket: Socket) {
    if (this.gameMode === GameMode.Multiple) {
      this.logger.scope("LoadSocket").debug("소켓 로드");
      this.socket = socket;
    } else {
      this.logger
        .scope("LoadSocket")
        .debug("게임모드가 멀티가 아니므로 소켓 취소");
      socket.destroy();
    }
  }

  destroySocket() {
    this.logger.scope("DestroySocket").debug("소켓 취소");
    this.socket.destroy();
  }

  loadUi(ui: UserInterface) {
    this.logger.scope("LoadUi").debug("인터페이스 로드");
    this.ui = ui;
  }

  loadRenderer(renderer: Renderer) {
    this.logger.scope("LoadRenderer").debug("렌더러 로드");
    this.renderer = renderer;
  }

  loadEventManager(eventManager: EventManager) {
    this.logger.scope("LoadEventManager").debug("이벤트매니저 로드");
    this.eventManager = eventManager;
    /* 로그인 리스너 */
    this.eventManager.listen("loginUser", (eventManager, data) => {
      const user = new Player(data.id);
      user.setPosition(data.x ?? 0, data.y ?? 0);
      this.setControlUnit(user);
    });
  }

  loadGameMapManager(gameMapManager: GameMapManager) {
    this.logger.scope("LoadGameMapManager").debug("이벤트매니저 로드");
    this.gameMapManager = gameMapManager;
  }

  playMode(mode: GameMode) {
    this.logger.scope("PlayMode").debug("게임엔진 모드 변경:", mode);
    this.gameMode = mode;
    this.eventManager.notify();
  }
}
