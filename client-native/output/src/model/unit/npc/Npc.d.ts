import AutoMoveable from '../implement/AutoMoveable';
import Question from '../../option/Question';
import Unit from '../Unit';
import Quest from '@model/option/Quest';
export default class Npc extends Unit implements AutoMoveable {
    routine: (unit: Unit) => void;
    quest: Quest[];
    constructor(name: string, option?: HealthOption);
    addQuest(quest: Quest): void;
    draw(ctx: CanvasRenderingContext2D, labelCtx: CanvasRenderingContext2D, { worldAxisX, worldAxisY }: WorldAxis): void;
    setRoutine(routine: (unit: Unit) => void): void;
    autoMove(): void;
    question: Question;
    startConversation(): Question;
    endConversation(): void;
}
