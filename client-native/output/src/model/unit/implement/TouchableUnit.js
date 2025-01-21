export default class TouchableUnit {
    decreaseHp(amount) {
        this.hp -= amount;
        this.hp = 0;
    }
    decreaseMp(amount) {
        this.mp -= amount;
        this.mp = 0;
    }
}
