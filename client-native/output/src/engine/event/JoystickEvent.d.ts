import GameEngine from '@core/GameEngine';
import { Unit } from '@model/unit';
export default class JoystickEvent {
    engine: GameEngine;
    joystick: {
        w: boolean;
        a: boolean;
        d: boolean;
        s: boolean;
        space: boolean;
    };
    order: Gaze[];
    constructor(engine: GameEngine);
    get controlUnit(): Unit | null;
    manualKeyDown(unit: Unit, key: 'w' | 'a' | 's' | 'd'): void;
    manualKeyUp(unit: Unit, key: 'w' | 'a' | 's' | 'd'): void;
    private handleKeyDown;
    private handleKeyUp;
    clearMove(): void;
    run(): void;
}
