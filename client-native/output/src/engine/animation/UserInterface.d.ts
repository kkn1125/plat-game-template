import GameEngine from '@core/GameEngine';
import Logger from '@util/Logger';
import Question from '@model/unit/option/Question';
export default class UserInterface {
    logger: Logger<UserInterface>;
    id: `ui-${string}`;
    engine: GameEngine;
    readonly INTERFACE: HTMLElement;
    readonly APP: HTMLElement;
    canvasMap: Map<Id, {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
    }>;
    eventMap: Map<Id, (e: Event & UIEvent & MouseEvent) => void>;
    constructor(engine: GameEngine);
    get eventManager(): import("..").EventManager;
    button(content: (options?: {
        height?: number | undefined;
    }) => string, size: number, helper: string): string;
    createInterface(): void;
    handleCanvasResize(canvas: HTMLCanvasElement): void;
    getLayer(id: Id): {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
    };
    createLayer(id: Id): {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
    };
    login(e: MouseEvent): void;
    createLoginDialog(): void;
    conversation(question: Question): void;
}
