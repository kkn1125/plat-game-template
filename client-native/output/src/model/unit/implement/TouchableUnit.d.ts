export default abstract class TouchableUnit {
    abstract hp: number;
    abstract mp: number;
    abstract maxHp: number;
    abstract maxMp: number;
    abstract getHp(): number;
    abstract getMp(): number;
    decreaseHp(amount: number): void;
    decreaseMp(amount: number): void;
}
