export declare const GameMode: {
    readonly Test: "Test";
    readonly Single: "Single";
    readonly Multiple: "Multiple";
};
export type GameMode = (typeof GameMode)[keyof typeof GameMode];
export declare const UnitState: {
    Die: string;
    Talk: string;
    Idle: string;
    Move: string;
    Attack: string;
    Skill: string;
};
export type UnitState = (typeof UnitState)[keyof typeof UnitState];
export declare const QuestionState: {
    Talk: string;
    Idle: string;
};
export type QuestionState = (typeof QuestionState)[keyof typeof QuestionState];
export declare const EventName: {
    readonly AddUnit: "AddUnit";
    readonly AddMap: "AddMap";
    readonly StartRender: "StartRender";
    readonly StopRender: "StopRender";
    readonly StartEngine: "StartEngine";
    readonly StopEngine: "StopEngine";
    readonly StartGame: "StartGame";
    readonly StopGame: "StopGame";
};
export type EventName = (typeof EventName)[keyof typeof EventName];
export declare const GameState: {
    readonly Init: "Init";
    readonly Prepare: "Prepare";
    readonly Loading: "Loading";
    readonly Idle: "Idle";
    readonly Close: "Close";
};
export type GameState = (typeof GameState)[keyof typeof GameState];
export declare const Tile: {
    readonly Grass: "0";
    readonly Road: "1";
    readonly RoadRock: "1r";
    readonly Water: "2";
    readonly GrassTree: "0t";
    readonly GrassBush: "0b";
    readonly GrassRock: "0r";
};
export type Tile = (typeof Tile)[keyof typeof Tile];
