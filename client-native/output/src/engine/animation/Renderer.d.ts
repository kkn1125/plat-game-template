import GameEngine from '@core/GameEngine';
import Logger from '@util/Logger';
declare class Renderer {
    prevTime: number;
    logger: Logger<Renderer>;
    engine: GameEngine;
    constructor(engine: GameEngine);
    get currentMap(): import("../..").GameMap | null;
    get controlUnit(): import("../..").Unit | null;
    get units(): import("../..").Unit[];
    get portals(): import("../..").Portal[];
    get worldSize(): {
        x: number;
        y: number;
    };
    get worldAxisX(): number;
    get worldAxisY(): number;
    get characterPosition(): {
        characterX: number;
        characterY: number;
    };
    get worldPosition(): {
        worldAxisX: number;
        worldAxisY: number;
    };
    render(): void;
    private animate;
    private ticktock;
    private clearDraw;
    private afterDraw;
    getCameraMoveableRange(positionX: number, positionY: number): {
        rangeX: number;
        rangeY: number;
    };
    private mapDraw;
    get sameLocationPortals(): import("../..").Portal[];
    get sameLocationUnits(): import("../..").Unit[];
    private portalDraw;
    private unitDraw;
    private draw;
}
export default Renderer;
