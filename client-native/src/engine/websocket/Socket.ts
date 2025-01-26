import { path } from '@/source/sprites';
import GameEngine from '@core/GameEngine';
import { Unit } from '@model/unit';
import Player from '@model/unit/player/Player';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import { mode } from '@variable/globalControl';
import Pako from 'pako';

export default class Socket {
  id = makeId('socket');
  url: string = mode === 'development' ? 'ws://localhost:9001' : 'wss://port-0-plat-game-template-28f9s2blr1oy4j2.sel5.cloudtype.app';
  logger = new Logger<Socket>(this);
  socket!: WebSocket;
  engine!: GameEngine;

  constructor(engine: GameEngine) {
    this.engine = engine;

    const websocket = new WebSocket(this.url);
    websocket.binaryType = 'arraybuffer';
    websocket.onopen = this.open.bind(this);
    websocket.onmessage = this.message.bind(this);
    websocket.onerror = this.error.bind(this);
    websocket.onclose = this.close.bind(this);

    this.socket = websocket;
  }

  open(e: Event) {
    // console.log(e);
  }

  message(message: MessageEvent) {
    const compressedData = new Uint8Array(message.data);

    const compressMessage = JSON.parse(Pako.inflate(compressedData, { to: 'string' }));
    switch (compressMessage.type) {
      case 'init': {
        compressMessage.users.forEach((user: any) => {
          const unit = new Unit(user.id);
          unit.setPosition(user.position.x, user.position.y);
          this.engine.addUnit(unit);
        });
        break;
      }
      case 'forward': {
        for (const unit of this.engine.units) {
          if (unit.name === compressMessage.id) {
            unit.location.locate = compressMessage.mapName;
            unit.setPosition(compressMessage.x, compressMessage.y);
            break;
          }
        }
        break;
      }
      case 'stop':
        for (const unit of this.engine.units) {
          if (unit.name == compressMessage.id) {
            unit.state = 'Idle';
            if (compressMessage.g === 0) {
              unit.joystick.w = false;
              unit.order.splice(unit.order.indexOf('top'), 1);
            }
            if (compressMessage.g === 1) {
              unit.joystick.s = false;
              unit.order.splice(unit.order.indexOf('bottom'), 1);
            }
            if (compressMessage.g === 2) {
              unit.joystick.a = false;
              unit.order.splice(unit.order.indexOf('left'), 1);
            }
            if (compressMessage.g === 3) {
              unit.joystick.d = false;
              unit.order.splice(unit.order.indexOf('right'), 1);
            }
            const lastKey = unit.order.at(-1);
            if (lastKey) {
              switch (lastKey) {
                case 'top': {
                  unit.gaze = 'top';
                  break;
                }
                case 'bottom': {
                  unit.gaze = 'bottom';
                  break;
                }
                case 'left': {
                  unit.gaze = 'left';
                  break;
                }
                case 'right': {
                  unit.gaze = 'right';
                  break;
                }
              }
            }
            break;
          }
        }
        break;
      case 'logout':
        this.engine.removePlayerByName(compressMessage.id);
        break;
      case 'login':
        this.engine.eventManager.emit(`loginUser`, { id: compressMessage.id, x: compressMessage.x, y: compressMessage.y });
        break;
      case 'add':
        const newPlayer = new Player(compressMessage.id);
        newPlayer.setPosition(compressMessage.x, compressMessage.y);
        this.engine.addPlayer(newPlayer);
        break;
      default:
        for (const unit of this.engine.units) {
          if (unit.name == compressMessage.id) {
            const speed = unit.increaseSpeed;
            if (compressMessage.xy === 0) {
              unit.move(0, -speed);
              unit.gaze = 'top';
              unit.state = 'Move';
              if (!unit.order.includes('top')) {
                unit.order.push('top');
              }
            } else if (compressMessage.xy === 1) {
              unit.move(0, speed);
              unit.gaze = 'bottom';
              unit.state = 'Move';
            } else if (compressMessage.xy === 2) {
              unit.move(-speed, 0);
              unit.gaze = 'left';
              unit.state = 'Move';
            } else if (compressMessage.xy === 3) {
              unit.move(speed, 0);
              unit.gaze = 'right';
              unit.state = 'Move';
            }
            break;
          }
        }
        break;
    }
  }

  error(error: Event) {
    console.log(error);
  }

  close(e: CloseEvent) {
    console.log(e);
  }

  send(data: any, isBinary: boolean = true) {
    if (isBinary) {
      const compressed = Pako.deflate(JSON.stringify(data));
      this.socket.send(compressed);
    } else {
      this.socket.send(data);
    }
  }
}
