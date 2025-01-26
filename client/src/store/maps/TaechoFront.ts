import GameMap from '@model/gamemap/GameMap';

// prettier-ignore
export const TaechoFront = new GameMap('마을 앞', [
  ["gT","gT","gT","gT","gT","g","r","r","g","gT","gT","g","r","r","g","gT","g","g","r","r","g","gT","gT","gT","gT","gT","gT","gT","gT","gT","g","r","r","g","gT","g","r","r","g","g","w","w","w","w","w"],
  ["gT","gT","gT","gT","g","g","r","r","g","gT","gT","g","r","r","g","g","g","r","r","r","g","g","gT","gT","gT","gT","gT","gT","g","g","g","r","r","g","g","g","r","r","g","gB","w","w","w","w","w"],
  ["gT","gT","gT","g","g","g","r","r","g","g","g","g","r","r","r","r","r","r","r","r","g","g","gT","gT","gT","gT","gT","gT","g","g","g","r","r","r","r","r","r","r","g","gB","w","w","w","w","w"],
  ["gT","gT","gT","g","g","g","r","r","g","g","g","g","r","r","r","r","r","r","g","g","g","g","w","w","w","w","w","w","g","g","g","r","r","g","g","g","r","r","g","g","w","w","w","w","w"],
  ["gT","gT","g","gT","g","g","r","r","g","gT","g","g","g","g","g","g","r","r","g","g","g","gB","w","w","w","w","w","gB","g","g","r","r","r","g","g","g","r","r","g","g","w","w","w","w","w"],
  ["gT","gT","g","g","g","g","r","r","g","g","g","gB","gB","gB","g","g","r","r","g","g","w","w","w","w","w","w","w","w","g","g","g","r","r","g","g","g","r","r","g","g","w","w","w","w","w"],
  ["gT","gT","gT","g","gT","g","r","r","g","g","w","w","w","w","gT","g","r","r","g","gT","w","w","w","gB","gB","g","g","g","g","g","g","r","r","g","g","g","r","r","g","gB","w","w","w","w","w"],
  ["gT","g","g","g","g","g","r","r","g","g","gB","g","g","g","g","g","r","r","g","g","w","w","w","w","w","w","w","w","g","g","g","r","r","r","r","r","r","r","g","g","gB","gT","gB","g","gT"],
  ["g","g","g","g","g","g","r","r","g","g","g","g","g","g","g","g","r","r","g","g","g","gT","w","w","w","w","w","w","g","g","g","r","r","r","r","r","r","r","g","g","g","g","g","g","g"],
  ["r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","g","g","g","gB","w","w","w","w","w","w","g","g","g","r","r","g","g","g","r","r","r","r","r","r","r","r","r"],
  ["r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","rB","r","r","r","r","g","g","w","w","w","w","w","w","g","g","g","r","r","g","g","g","r","r","r","r","r","r","r","r","r"],
  ["g","g","g","r","r","g","g","g","g","g","g","g","g","r","r","w","w","r","r","r","g","g","gB","gB","g","gT","g","gB","g","g","g","r","r","g","g","g","r","r","r","r","r","r","r","g","g"],
  ["gT","g","g","r","r","g","gT","g","g","gT","g","g","g","r","rB","w","w","w","r","r","g","g","g","g","g","g","g","g","g","g","g","r","r","g","g","g","r","r","r","r","r","r","r","g","gT"],
  ["gT","gT","g","r","r","g","g","g","g","g","g","g","g","r","rB","w","w","w","r","r","g","g","g","r","r","r","r","g","g","g","g","r","r","r","r","r","r","r","r","r","r","r","r","g","gT"],
  ["gT","g","g","r","r","r","r","r","r","r","r","r","r","r","r","w","rT","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","g","gT"],
  ["gT","gT","g","r","r","g","g","g","g","g","g","g","g","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","g","g","g","r","r","r","r","r","r","r","g","gT"],
  ["gT","gT","g","r","r","g","gT","gT","g","g","g","g","g","r","r","r","r","r","g","g","g","g","g","g","g","g","g","g","g","g","g","r","r","g","g","g","r","r","r","r","r","r","r","g","g"],
  ["gT","g","g","r","r","g","g","g","g","gT","gT","gT","g","r","r","r","r","r","g","g","g","g","g","g","g","g","g","g","g","g","g","r","r","g","g","g","r","r","r","r","r","r","r","r","r"],
  ["g","g","g","r","r","g","g","g","g","g","g","g","g","r","r","r","r","r","g","g","g","g","g","gB","w","w","g","w","w","g","g","r","r","g","g","g","r","r","r","r","r","r","r","r","r"],
  ["r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","g","gB","w","w","gB","w","w","g","g","r","r","g","g","g","r","r","g","g","g","r","r","g","g"],
  ["r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","g","g","g","g","g","g","w","w","w","w","w","gB","g","r","r","r","r","r","r","r","g","g","g","r","r","g","gT"],
  ["g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","r","r","g","g","g","g","g","g","w","w","w","w","w","gB","g","r","r","g","g","g","r","r","g","gT","gT","r","r","g","gT"],
  ["gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","g","g","r","r","g","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","g","r","r","g","gT","g","r","r","g","gT","gT","r","r","g","gT"]
]);

// TaechoFront.setDefaultSpawnPositionByField(-6, -2);
TaechoFront.setDefaultSpawnPositionByField(-6, -8);
// Town2.setForwardedPositionByField(-22, -1.5);
// Town2.setForwardedDirection('right');
