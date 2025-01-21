import GameMap from './GameMap';
import { Tile } from '@variable/constant';
export default class Field {
    id: `field-${string}`;
    name: string;
    position: XY;
    groundLevel: number;
    passable: boolean;
    gameMap: GameMap;
    frame: number;
    FPS: number;
    frameLate: number;
    constructor(name: string, gameMap: GameMap);
    get isPassable(): boolean;
    getField(x: number, y: number): Field;
    get roundFields(): {
        top: Field;
        topLeft: Field;
        topRight: Field;
        bottom: Field;
        bottomLeft: Field;
        bottomRight: Field;
        left: Field;
        right: Field;
        center: Field;
    };
    includes(fields: Field[], tile: Tile): boolean;
    equals(field: Field, tile: Tile): boolean;
    validateGrass(): [HTMLImageElement, number, number];
    validateRoad(): [HTMLImageElement, number, number];
    get spriteTile(): [HTMLImageElement, number, number];
    get fields(): Field[][];
    setX(x: number): this;
    setY(y: number): this;
    setPosition(x: number, y: number): this;
    subDraw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis, sprites: HTMLImageElement, indexX: number, indexY: number): void;
    draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void;
}
