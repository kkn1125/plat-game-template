import AutoMoveable from '../implement/AutoMoveable';
import Unit from '../Unit';
export default class Monster extends Unit implements AutoMoveable {
    routine: (unit: Unit) => void;
    draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void;
    setRoutine(routine: (unit: Unit) => void): void;
    autoMove(): void;
}
