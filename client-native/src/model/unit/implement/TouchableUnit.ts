export default abstract class TouchableUnit {
  abstract hp: number;
  abstract mp: number;
  abstract maxHp: number;
  abstract maxMp: number;

  abstract decreaseHp(amount: number): void;
  abstract decreaseMp(amount: number): void;
}
