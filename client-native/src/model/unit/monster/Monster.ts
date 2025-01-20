import Unit from '../Unit';

export default class Monster extends Unit {
  routine!: (unit: Unit, originPosition: XY) => void;

  draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void {
    this.autoMove();
    super.draw(ctx, { worldAxisX, worldAxisY });
  }

  setRoutine(routine: (unit: Unit, originPosition: XY) => void) {
    this.routine = routine;
  }

  autoMove() {
    const originPosition = { ...this.position };
    this.routine?.(this, originPosition);
  }
}
