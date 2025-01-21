import GameMap from '@model/gamemap/GameMap';
import { Unit } from '@model/unit';
import Logger from '@util/Logger';
import GameEngine from './GameEngine';
export default class GameMapManager {
    logger: Logger<GameMapManager>;
    engine: GameEngine;
    gameMaps: Map<Id, GameMap>;
    currentMap: GameMap | null;
    constructor(engine: GameEngine);
    get controlUnit(): Unit | null;
    get mapSizeX(): 60;
    get mapSizeY(): 60;
    addGameMap(gameMap: GameMap): void;
    changeMap(forwardMap: GameMap): void;
    getAxis(currentMap: GameMap, controlUnit: Unit): {
        x: number;
        y: number;
    };
    collisionTop(currentMap: GameMap, controlUnit: Unit): boolean;
    collisionBottom(currentMap: GameMap, controlUnit: Unit): boolean;
    collisionLeft(currentMap: GameMap, controlUnit: Unit): boolean;
    collisionRight(currentMap: GameMap, controlUnit: Unit): boolean;
}
