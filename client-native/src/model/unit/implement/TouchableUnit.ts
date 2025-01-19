export default abstract class TouchableUnit {
  abstract hp: number;
  abstract mp: number;
  abstract maxHp: number;
  abstract maxMp: number;

  abstract getHp(): number;
  abstract getMp(): number;

  decreaseHp(amount: number): void {
    this.hp -= amount;
    this.hp = 0;
  }

  decreaseMp(amount: number): void {
    this.mp -= amount;
    this.mp = 0;
  }
}
