import AutoMoveable from '../implement/AutoMoveable';
import Unit from '../Unit';

export default class Monster extends Unit implements AutoMoveable {
  routine!: (unit: Unit) => void;

  draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void {
    this.autoMove();
    super.draw(ctx, { worldAxisX, worldAxisY });
  }

  setRoutine(routine: (unit: Unit) => void) {
    this.routine = routine;
  }

  autoMove() {
    this.routine?.(this);
  }
}
