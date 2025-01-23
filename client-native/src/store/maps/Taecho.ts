import GameMap from '@model/gamemap/GameMap';

// @prettier-ignore
export const Taecho = new GameMap('태초마을', [
  ["gT","gT","gT","gT","gT","g","gT","g","g","gT","g","g","gT","g","g","gT","g","r","g","g","g","gT","g","g","gT","g","g","gT","g","g","gT","g","r","g","gT"],
  ["gT","gT","gT","g","g","g","g","g","g","g","g","g","g","g","gT","g","g","r","g","g","g","g","g","g","g","g","g","g","g","g","g","g","r","g","g"],
  ["gT","gT","gT","g","g","gT","g","g","g","g","g","gT","g","g","g","g","g","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r"],
  ["gT","g","g","gT","g","g","g","gT","g","g","g","g","g","gT","g","g","g","r","g","g","g","g","g","g","g","g","g","g","g","g","g","g","r","g","g"],
  ["g","gT","g","g","gT","g","g","g","gT","g","gT","g","g","gT","g","gT","g","r","g","gT","g","g","gT","g","g","g","gT","g","g","g","gT","g","r","g","g"],
  ["w","w","gB","g","g","g","g","g","g","g","g","g","g","g","g","g","g","r","g","g","g","g","g","g","g","g","g","g","g","g","g","g","r","g","gT"],
  ["w","w","g","g","g","r","r","r","r","g","g","r","r","r","r","g","g","r","g","g","r","r","r","r","g","g","r","r","r","r","g","g","r","g","g"],
  ["w","w","g","g","g","r","r","r","r","g","g","r","r","r","r","g","g","r","g","g","r","r","r","r","g","g","r","r","r","r","g","g","r","g","gT"],
  ["w","w","g","g","g","rS","rX","rX","rS","g","g","rX","rX","rX","rX","g","g","r","g","g","rX","rX","rX","rX","g","g","rS1","rX","rS1","rS","g","g","r","g","g"],
  ["w","w","g","g","g","rS","rX","rS","rS","g","g","rX","rX","rX","rX","g","g","r","g","gF","rX","rX","rX","rX","g","g","rS","rS","rX","rS","g","g","r","g","gT"],
  ["g","gB","g","g","g","g","r","r","gO","g","g","g","r","r","gO","g","g","r","g","g","gO","r","r","g","g","g","gO","r","r","g","g","g","r","g","g"],
  ["g","g","g","g","g","g","r","r","g","g","g","g","r","r","g","g","g","r","g","g","g","r","r","g","g","g","g","r","r","g","g","g","r","g","g"],
  ["r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r"],
  ["r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r"],
  ["g","g","g","g","g","r","r","g","g","r","r","g","g","g","g","g","g","g","g","g","g","g","g","g","g","g","r","r","g","g","g","g","g","g","g"],
  ["g","g","g","g","g","r","r","g","g","r","r","g","g","gB","gB","g","g","g","g","g","g","gB","gB","gB","g","g","r","r","g","g","g","g","g","gT","gT"],
  ["w","w","w","g","g","r","r","g","g","r","r","g","g","w","w","w","w","g","g","w","w","w","w","w","g","g","r","r","g","g","w","w","w","w","w"],
  ["w","w","w","g","g","r","r","g","g","r","r","g","g","w","w","w","w","g","g","w","w","w","w","w","g","g","r","r","g","g","w","w","w","w","w"],
  ["w","w","w","g","g","r","r","g","g","r","r","g","g","w","w","w","w","g","g","w","w","w","w","w","g","g","r","r","g","g","w","w","w","w","w"],
  ["gT","g","gT","g","gT","r","r","g","g","r","r","g","g","g","gT","g","gT","g","gT","g","gT","g","gT","g","g","g","r","r","g","g","gT","g","gT","g","gT"],
  ["gT","gT","g","gT","g","r","r","g","g","r","r","g","g","gT","g","gT","g","g","g","gT","g","gT","g","gT","g","g","r","r","g","g","g","g","g","gT","gT"],
  ["gT","gT","gT","g","gT","r","r","g","g","r","r","g","g","g","gT","g","gT","g","gT","g","gT","g","gT","g","g","g","r","r","g","g","gT","g","gT","gT","gT"],
  ["gT","gT","gT","gT","gT","r","r","gT","gT","r","r","g","g","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","gT","g","r","r","g","gT","gT","gT","gT","gT","gT"]
]);

Taecho.setDefaultSpawnPositionByField(0, 1.5);
// Town1.setForwardedPositionByField(-15, -0.5);
// Town1.setForwardedDirection('right');
