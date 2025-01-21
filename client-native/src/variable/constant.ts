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
  Grass: '0',
  Road: '1',
  RoadRock: '1r',
  Water: '2',
  GrassTree: '0t',
  GrassBush: '0b',
  GrassRock: '0r',
} as const;
export type Tile = (typeof Tile)[keyof typeof Tile];
