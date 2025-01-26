import Unit from '../Unit';

export default abstract class AutoMoveable {
  abstract routine: (unit: Unit) => void;

  abstract setRoutine(routine: (unit: Unit) => void): void;

  abstract autoMove(): void;
}
