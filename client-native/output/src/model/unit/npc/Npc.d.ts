import AutoMoveable from '../implement/AutoMoveable';
import Question from '../option/Question';
import Unit from '../Unit';
export default class Npc extends Unit implements AutoMoveable {
    routine: (unit: Unit) => void;
    constructor(name: string, option?: HealthOption);
    draw(ctx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void;
    setRoutine(routine: (unit: Unit) => void): void;
    autoMove(): void;
    question: Question;
    startConversation(): Question;
    endConversation(): void;
}
