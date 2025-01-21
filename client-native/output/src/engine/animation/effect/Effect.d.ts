import Logger from '@util/Logger';
export default class Effect {
    readonly logger: Logger<Effect>;
    private isProcessed;
    events: Function[];
    onDestroy(cb: () => void): void;
    id: string;
    name: string;
    startTime: number;
    before: number;
    duration: number;
    effect: number | NodeJS.Timeout | undefined;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    fadeInDuration: number;
    fadeOutDuration: number;
    constructor(name: string);
    renderFx: (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, opacity: number) => void;
    setupCanvas(): void;
    handleResizeOnce(): void;
    draw(time: number): void;
    destroy(): void;
    run(): Promise<unknown>;
}
