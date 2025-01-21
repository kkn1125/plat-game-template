import Logger from '@util/Logger';
import JoystickEvent from './JoystickEvent';
class EventManager {
    constructor(engine) {
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Logger(this)
        });
        Object.defineProperty(this, "engine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "observers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "joystickEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.engine = engine;
        this.joystickEvent = new JoystickEvent(this.engine);
        this.initialize();
    }
    emit(name) {
        const listener = this.listeners.get(name);
        if (!listener)
            return;
        listener.forEach((handler) => handler(this));
    }
    initialize() {
        this.joystickEvent.run();
        /* Conversation */
        window.addEventListener('click', (e) => {
            const target = e.target;
            const conversation = target.closest('#conversation');
            if (!conversation)
                return;
            e.preventDefault();
            if (target.classList.contains('next')) {
                this.emit('conversationNext');
            }
            if (target.classList.contains('cancel')) {
                this.emit('conversationCancel');
            }
        });
    }
    notify() {
        this.observers.forEach((observer) => observer.update(this));
    }
    watch(observer) {
        this.logger.scope('Watch').debug('옵저버 등록:', observer);
        this.observers.push(observer);
    }
    unwatch(observer) {
        this.observers = this.observers.filter((o) => o !== observer);
    }
    listen(name, handler) {
        this.listeners.set(name, [...(this.listeners.get(name) || []), handler]);
    }
    close(name) {
        return this.listeners.delete(name);
    }
}
export default EventManager;
