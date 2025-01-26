import GameMap from '@model/gamemap/GameMap';
import Unit from '../Unit';

export default abstract class Forwardable {
  abstract forwardMap: GameMap<Maps>;
  abstract forwardPosition: XY;
  abstract forward(unit: Unit): void;
  abstract setForwardMap(forwardMap: GameMap<Maps>, forwardPosition: XY): void;
  // abstract setForwardPositionByMap(forwardMap: GameMap): void;
}
