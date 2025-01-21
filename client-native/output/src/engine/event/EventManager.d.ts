import GameEngine from '@core/GameEngine';
import Logger from '@util/Logger';
import JoystickEvent from './JoystickEvent';
type Handler = (manager: EventManager) => void;
interface Subject {
    watch(observer: Observer): void;
    unwatch(observer: Observer): void;
    notify(): void;
}
interface Observer {
    update(subject: Subject): void;
}
declare class EventManager implements Subject {
    logger: Logger<EventManager>;
    engine: GameEngine;
    observers: Observer[];
    listeners: Map<Id, Handler[]>;
    joystickEvent: JoystickEvent;
    constructor(engine: GameEngine);
    emit(name: Id): void;
    private initialize;
    notify(): void;
    watch(observer: Observer): void;
    unwatch(observer: Observer): void;
    listen(name: Id, handler: Handler): void;
    close(name: Id): boolean;
}
export default EventManager;
