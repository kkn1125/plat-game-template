import Field from './Field';
export default class GameMap {
    static createMap(fields: string[][], gameMap: GameMap): Field[][];
    id: `gamemap-${string}`;
    name: Maps;
    fields: Field[][];
    defaultSpawnPosition: XY;
    forwardedPosition: XY;
    constructor(name: Maps, fields: string[][]);
    setDefaultSpawnPosition(x: number, y: number): void;
    setDefaultSpawnPositionByField(indexX: number, indexY: number): void;
    setForwardedPosition(x: number, y: number): void;
    setForwardedPositionByField(indexX: number, indexY: number): void;
    setForwardedDirection(direction: 'top' | 'bottom' | 'left' | 'right'): void;
    drawMap(ctx: CanvasRenderingContext2D, worldAxis: WorldAxis): void;
    drawObject(ctx: CanvasRenderingContext2D, worldAxis: WorldAxis, emboss?: boolean): void;
}
