import GameMap from '@model/gamemap/GameMap';

export const EmptyHouse1 = new GameMap('빈 집', [
  ['W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W'],
]);
EmptyHouse1.setDefaultSpawnPositionByField(0, 0);
