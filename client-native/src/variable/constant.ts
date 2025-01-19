export const GameMode = {
  Test: "Test",
  Single: "Single",
  Multiple: "Multiple",
} as const;
export type GameMode = (typeof GameMode)[keyof typeof GameMode];

export const UnitState = {
  Die: "Die",
  Idle: "Idle",
  Move: "Move",
  Attack: "Attack",
  Skill: "Skill",
};
export type UnitState = (typeof UnitState)[keyof typeof UnitState];

export const EventName = {
  AddUnit: "AddUnit",
  AddMap: "AddMap",
  StartRender: "StartRender",
  StopRender: "StopRender",
  StartEngine: "StartEngine",
  StopEngine: "StopEngine",
  StartGame: "StartGame",
  StopGame: "StopGame",
} as const;
export type EventName = (typeof EventName)[keyof typeof EventName];

export const GameState = {
  Init: "Init",
  Prepare: "Prepare",
  Loading: "Loading",
  Idle: "Idle",
  Close: "Close",
} as const;
export type GameState = (typeof GameState)[keyof typeof GameState];
