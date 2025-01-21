import { Unit } from '@model/unit';
import Logger from '@util/Logger';
import { GameMode, GameState } from '@variable/constant';
import { makeAutoObservable } from 'mobx';
export default class GameEngine {
    get sameLocationPortals() {
        return this.portals.filter((portal) => this.gameMapManager.currentMap?.name === portal.location.locate);
    }
    get sameLocationUnits() {
        return this.units.filter((unit) => this.gameMapManager.currentMap?.name === unit.location.locate);
    }
    constructor() {
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Logger(this)
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GameState.Init
        });
        Object.defineProperty(this, "gameMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: GameMode.Single
        });
        Object.defineProperty(this, "ui", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "eventManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "gameMapManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "controlUnit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "units", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "portals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.logger.scope().debug('초기화 게임엔진 모드:', this.gameMode);
        makeAutoObservable(this);
    }
    setControlUnit(unit) {
        unit.unitColor = 'red';
        this.controlUnit = unit;
        unit.setGameEngine(this);
        // unit.detectable = false;
    }
    setState(state) {
        this.logger.scope('SetState').debug('게임 엔진 모드 변경:', state);
        this.state = state;
        this.eventManager.notify();
    }
    addUnit(unit) {
        this.logger.scope('AddUnit').debug('유닛 추가', unit.id);
        this.units.push(unit);
        unit.setGameEngine(this);
    }
    addPortal(portal) {
        this.logger.scope('AddPortal').debug('포탈 추가', portal.id);
        this.portals.push(portal);
        portal.setGameEngine(this);
    }
    loadUi(ui) {
        this.logger.scope('LoadUi').debug('인터페이스 로드');
        this.ui = ui;
    }
    loadRenderer(renderer) {
        this.logger.scope('LoadRenderer').debug('렌더러 로드');
        this.renderer = renderer;
    }
    loadEventManager(eventManager) {
        this.logger.scope('LoadEventManager').debug('이벤트매니저 로드');
        this.eventManager = eventManager;
        this.eventManager.listen('loginUser', () => {
            const user = new Unit('test-user');
            user.setPosition(0, 0);
            this.setControlUnit(user);
        });
    }
    loadGameMapManager(gameMapManager) {
        this.logger.scope('LoadGameMapManager').debug('이벤트매니저 로드');
        this.gameMapManager = gameMapManager;
    }
    playMode(mode) {
        this.logger.scope('PlayMode').debug('게임엔진 모드 변경:', mode);
        this.gameMode = mode;
        this.eventManager.notify();
    }
}
