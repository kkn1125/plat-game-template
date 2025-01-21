import GameMap from '@model/gamemap/GameMap';
import Unit from '../Unit';

export default abstract class Forwardable {
  abstract forwardMap: GameMap;
  abstract forward(unit: Unit): void;
}
