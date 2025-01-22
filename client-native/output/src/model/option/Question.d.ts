import Logger from '@util/Logger';
import Npc from '../unit/npc/Npc';
import { QuestionState } from '@variable/constant';
export default class Question {
    logger: Logger<Question>;
    npc: Npc;
    scripts: string[];
    index: number;
    state: QuestionState;
    constructor(npc: Npc);
    addQuestion(...scripts: string[]): void;
    get current(): string;
    getNext(): Generator<string, void, unknown>;
    start(): void;
    end(): void;
    reset(): void;
}
