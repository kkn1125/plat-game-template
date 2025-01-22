export const GameMode = {
    Test: 'Test',
    Single: 'Single',
    Multiple: 'Multiple',
};
export const UnitState = {
    Die: 'Die',
    Talk: 'Talk',
    Idle: 'Idle',
    Move: 'Move',
    Attack: 'Attack',
    Skill: 'Skill',
};
export const QuestionState = {
    Talk: 'Talk',
    Idle: 'Idle',
};
export const EventName = {
    AddUnit: 'AddUnit',
    AddMap: 'AddMap',
    StartRender: 'StartRender',
    StopRender: 'StopRender',
    StartEngine: 'StartEngine',
    StopEngine: 'StopEngine',
    StartGame: 'StartGame',
    StopGame: 'StopGame',
};
export const GameState = {
    Init: 'Init',
    Prepare: 'Prepare',
    Loading: 'Loading',
    Idle: 'Idle',
    Close: 'Close',
};
export const Tile = {
    Grass: 'g',
    Road: 'r',
    Water: 'w',
    RoadRock: 'rR',
    RoadTree: 'rT',
    RoadBush: 'rB',
    GrassRock: 'gR',
    GrassTree: 'gT',
    GrassBush: 'gB',
};
export const TileCrop = {
    GrassTree: {
        CropSizeX: 0,
        CropSizeY: 0,
        CropWidth: 0,
        CropHeight: 0,
    },
    RoadTree: {
        CropSizeX: 0,
        CropSizeY: 0,
        CropWidth: 0,
        CropHeight: 0,
    },
};
