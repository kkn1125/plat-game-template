import Renderer from '@animation/Renderer';
import EventManager from '@event/EventManager';
import GameMap from '@model/gamemap/GameMap';
import { Unit } from '@model/unit';
import Logger from '@util/Logger';
import { GameMode, GameState } from '@variable/constant';
import { makeAutoObservable } from 'mobx';
import GameMapManager from './GameMapManager';

export default class GameEngine {
  logger = new Logger<GameEngine>(this);

  state: GameState = GameState.Init;

  gameMode: GameMode = GameMode.Test;
  renderer!: Renderer;
  eventManager!: EventManager;
  gameMapManager!: GameMapManager;
  controlUnit: Unit | null = null;

  units: Unit[] = [];

  constructor() {
    this.logger.scope().debug('초기화 게임엔진 모드:', this.gameMode);
    makeAutoObservable(this);
  }

  setControlUnit(unit: Unit) {
    unit.unitColor = 'red';
    this.controlUnit = unit;
  }

  setState(state: GameState) {
    this.logger.scope('SetState').debug('게임 엔진 모드 변경:', state);
    this.state = state;
    this.eventManager.notify();
  }

  addUnit(unit: Unit) {
    this.logger.scope('AddUnit').debug('유닛 추가', unit.id);
    this.units.push(unit);
  }

  loadRenderer(renderer: Renderer) {
    this.logger.scope('LoadRenderer').debug('렌더러 로드');
    this.renderer = renderer;
  }

  loadEventManager(eventManager: EventManager) {
    this.logger.scope('LoadEventManager').debug('이벤트매니저 로드');
    this.eventManager = eventManager;
  }

  loadGameMapManager(gameMapManager: GameMapManager) {
    this.logger.scope('LoadGameMapManager').debug('이벤트매니저 로드');
    this.gameMapManager = gameMapManager;
  }

  playMode(mode: GameMode) {
    this.logger.scope('PlayMode').debug('게임엔진 모드 변경:', mode);
    this.gameMode = mode;
    this.eventManager.notify();
  }
}
