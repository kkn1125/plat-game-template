import GameEngine from '@core/GameEngine';
import { Unit } from '@model/unit';
import Player from '@model/unit/player/player';
import Logger from '@util/Logger';
import { makeId } from '@util/makeId';
import { mode } from '@variable/globalControl';
import Pako from 'pako';

// const User = new Protobuf.Type("User")
//   .add(new Protobuf.Field("id", 1, "string")) // 필드 이름, 태그 번호, 타입
//   .add(new Protobuf.Field("name", 2, "string"))
//   .add(new Protobuf.Field("age", 3, "int32"));

// const LoginMessage = new Protobuf.Type('LoginMessage')
//   .add(new Protobuf.Field('type', 1, 'string'))
//   .add(new Protobuf.Field('id', 2, 'string'))
//   .add(new Protobuf.Field('pw', 3, 'string'));

// const LocationMessage = new Protobuf.Type('LocationMessage').add(new Protobuf.Field('x', 1, 'float')).add(new Protobuf.Field('y', 2, 'float'));
// // .add(new Protobuf.Field('y', 3, 'float'));

// const ResponseMessage = new Protobuf.Type('ResponseMessage').add(new Protobuf.Field('type', 1, 'string')).add(new Protobuf.Field('data', 2, 'bytes'));

export default class Socket {
  id = makeId('socket');
  url: string = mode === 'development' ? 'ws://localhost:9001' : 'ws://localhost:9001';
  logger = new Logger<Socket>(this);
  socket!: WebSocket;
  engine!: GameEngine;

  // LoginMessage = new Protobuf.Type('LoginMessage')
  //   .add(new Protobuf.Field('type', 1, 'string'))
  //   .add(new Protobuf.Field('id', 2, 'string'))
  //   .add(new Protobuf.Field('pw', 3, 'string'));

  // LocationMessage = new Protobuf.Type('LocationMessage').add(new Protobuf.Field('type', 1, 'string')).add(new Protobuf.Field('xy', 2, 'string'));

  // ResponseMessage = new Protobuf.Type('ResponseMessage').add(new Protobuf.Field('type', 1, 'string')).add(new Protobuf.Field('data', 2, 'bytes'));

  constructor(engine: GameEngine) {
    this.engine = engine;

    const websocket = new WebSocket(this.url);
    websocket.binaryType = 'arraybuffer';
    websocket.onopen = this.open.bind(this);
    websocket.onmessage = this.message.bind(this);
    websocket.onerror = this.error.bind(this);
    websocket.onclose = this.close.bind(this);

    this.socket = websocket;

    /* 로그인 리스너 */
    this.engine.eventManager.listen('loginUser', (eventManager, data) => {
      // console.log('data:', data);
      const user = new Player(data.id);
      user.setPosition(data.x ?? 0, data.y ?? 0);
      this.engine.setControlUnit(user);
      // this.eventManager.emit(`loginUser`, { id, pw });
    });
  }

  open(e: Event) {
    // console.log(e);
  }

  message(message: MessageEvent) {
    const compressedData = new Uint8Array(message.data);

    // console.log(Pako.inflate(compressedData, { to: 'string' }));

    const compressMessage = JSON.parse(Pako.inflate(compressedData, { to: 'string' }));
    // const decoder = new TextDecoder();
    // const type = responseMessage.type;
    // const data = decoder.decode(responseMessage.data);
    // const json = JSON.parse(data);
    // console.log(compressMessage);
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
            // if (compressMessage.g === 0) {
            //   unit.gaze = 'top';
            //   unit.state = 'Idle';
            // } else if (compressMessage.g === 1) {
            //   unit.gaze = 'bottom';
            //   unit.state = 'Idle';
            // } else if (compressMessage.g === 2) {
            //   unit.gaze = 'left';
            //   unit.state = 'Idle';
            // } else if (compressMessage.g === 3) {
            //   unit.gaze = 'right';
            //   unit.state = 'Idle';
            // }

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
        // console.log(compressMessage);
        // this.engine.eventManager.emit(`loginUser`, { id: compressMessage.id, x: compressMessage.x, y: compressMessage.y });
        this.engine.removePlayerByName(compressMessage.id) /*  units.filter((unit) => unit.name !== compressMessage.id) */;
        break;
      case 'login':
        // console.log(compressMessage);
        this.engine.eventManager.emit(`loginUser`, { id: compressMessage.id, x: compressMessage.x, y: compressMessage.y });
        break;
      case 'add':
        // this.engine.eventManager.emit(`loginUser`, { id: compressMessage.id, x: compressMessage.x, y: compressMessage.y });
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
    // console.log(data);
    if (isBinary) {
      const compressed = Pako.deflate(JSON.stringify(data));
      this.socket.send(compressed);
    } else {
      this.socket.send(data);
    }
  }
}
