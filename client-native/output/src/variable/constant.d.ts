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
    readonly Grass: "g";
    readonly Road: "r";
    readonly Water: "w";
    readonly RoadRock: "rR";
    readonly RoadTree: "rT";
    readonly RoadBush: "rB";
    readonly GrassRock: "gR";
    readonly GrassTree: "gT";
    readonly GrassBush: "gB";
};
export type Tile = (typeof Tile)[keyof typeof Tile];
export declare const TileCrop: {
    GrassTree: {
        CropSizeX: number;
        CropSizeY: number;
        CropWidth: number;
        CropHeight: number;
    };
    RoadTree: {
        CropSizeX: number;
        CropSizeY: number;
        CropWidth: number;
        CropHeight: number;
    };
};
