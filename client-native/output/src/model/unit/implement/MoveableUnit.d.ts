export default abstract class MoveableUnit {
    abstract position: {
        x: number;
        y: number;
    };
    abstract velocity: {
        x: number;
        y: number;
    };
    abstract move(x: number, y: number): void;
}
