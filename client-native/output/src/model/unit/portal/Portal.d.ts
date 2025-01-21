import GameMap from '@model/gamemap/GameMap';
import Forwardable from '../implement/Forwardable';
import Unit from '../Unit';
export default class Portal extends Unit implements Forwardable {
    forwardMap: GameMap;
    constructor(name: string, option?: HealthOption, forwardMap?: GameMap);
    setForwardMap(forwardMap: GameMap): void;
    forward(unit: Unit): void;
    drawCharacter(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void;
}
