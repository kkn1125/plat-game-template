export const GameMode = {
  Test: 'Test',
  Single: 'Single',
  Multiple: 'Multiple',
} as const;
export type GameMode = (typeof GameMode)[keyof typeof GameMode];

export const UnitState = {
  Die: 'Die',
  Talk: 'Talk',
  Idle: 'Idle',
  Move: 'Move',
  Attack: 'Attack',
  Skill: 'Skill',
};
export type UnitState = (typeof UnitState)[keyof typeof UnitState];

export const QuestionState = {
  Talk: 'Talk',
  Idle: 'Idle',
};
export type QuestionState = (typeof QuestionState)[keyof typeof QuestionState];

export const EventName = {
  AddUnit: 'AddUnit',
  AddMap: 'AddMap',
  StartRender: 'StartRender',
  StopRender: 'StopRender',
  StartEngine: 'StartEngine',
  StopEngine: 'StopEngine',
  StartGame: 'StartGame',
  StopGame: 'StopGame',
} as const;
export type EventName = (typeof EventName)[keyof typeof EventName];

export const GameState = {
  Init: 'Init',
  Prepare: 'Prepare',
  Loading: 'Loading',
  Idle: 'Idle',
  Close: 'Close',
} as const;
export type GameState = (typeof GameState)[keyof typeof GameState];

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
} as const;
export type Tile = (typeof Tile)[keyof typeof Tile];

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
