import Unit from '../Unit';
export default class Monster extends Unit {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "routine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    draw(ctx, labelCtx, { worldAxisX, worldAxisY }) {
        this.autoMove();
        super.draw(ctx, labelCtx, { worldAxisX, worldAxisY });
    }
    setRoutine(routine) {
        this.routine = routine;
    }
    autoMove() {
        this.routine?.(this);
    }
}
