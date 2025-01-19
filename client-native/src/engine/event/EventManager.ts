import GameEngine from "@core/GameEngine";
import Logger from "@util/Logger";
import JoystickEvent from "./JoystickEvent";

type Handler = (manager: EventManager) => void;

interface Subject {
  watch(observer: Observer): void;
  unwatch(observer: Observer): void;
  notify(): void;
}

interface Observer {
  update(subject: Subject): void;
}

class EventManager implements Subject {
  logger = new Logger<EventManager>(this);

  engine: GameEngine;

  observers: Observer[] = [];

  listeners: Map<Id, Handler[]> = new Map();

  joystickEvent: JoystickEvent;

  constructor(engine: GameEngine) {
    this.engine = engine;
    this.joystickEvent = new JoystickEvent(this.engine);
    this.initialize();
  }

  private initialize() {
    this.joystickEvent.run();
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this));
  }

  watch(observer: Observer) {
    this.logger.scope("Watch").debug("옵저버 등록:", observer);
    this.observers.push(observer);
  }

  unwatch(observer: Observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  listen(name: Id, handler: Handler) {
    this.listeners.set(name, [...(this.listeners.get(name) || []), handler]);
  }

  close(name: Id) {
    this.listeners.delete(name);
  }
}

export default EventManager;
