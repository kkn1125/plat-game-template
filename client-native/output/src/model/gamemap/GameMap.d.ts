import Field from './Field';
export default class GameMap {
    static createMap(fields: string[][], gameMap: GameMap): Field[][];
    id: `gamemap-${string}`;
    name: Maps;
    fields: Field[][];
    defaultSpawnPosition: XY;
    constructor(name: Maps, fields: string[][]);
    setDefaultSpawnPosition(x: number, y: number): void;
    draw(ctx: CanvasRenderingContext2D, worldAxis: WorldAxis): void;
}
