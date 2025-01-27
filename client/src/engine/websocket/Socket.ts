import GameEngine from "@core/GameEngine";
import { Unit } from "@model/unit";
import Player from "@model/unit/player/Player";
import Logger from "@util/Logger";
import { makeId } from "@util/makeId";
import { SOCKET_URL } from "@variable/variable";
import { makeAutoObservable } from "mobx";
import Pako from "pako";

export default class Socket {
  id = makeId("socket");
  url: string = SOCKET_URL;
  logger = new Logger<Socket>(this);
  socket!: WebSocket;
  engine!: GameEngine;

  constructor(engine: GameEngine) {
    this.engine = engine;

    const websocket = new WebSocket(this.url);
    websocket.binaryType = "arraybuffer";
    websocket.onopen = this.open.bind(this);
    websocket.onmessage = this.message.bind(this);
    websocket.onerror = this.error.bind(this);
    websocket.onclose = this.close.bind(this);

    this.socket = websocket;
    makeAutoObservable(this);
  }

  open(e: Event) {
    // console.log(e);
  }

  message(message: MessageEvent) {
    const compressedData = new Uint8Array(message.data);

    const compressMessage = JSON.parse(
      Pako.inflate(compressedData, { to: "string" })
    );
    // console.log(compressMessage)
    switch (compressMessage.type) {
      case "init": {
        compressMessage.users.forEach((user: any) => {
          const player = new Player(user.id);
          player.setPosition(user.position.x, user.position.y);
          this.engine.addPlayer(player);
        });
        break;
      }
      case "forward": {
        for (const player of this.engine.players) {
          if (player.name === compressMessage.id) {
            player.location.locate = compressMessage.mapName;
            player.setPosition(compressMessage.x, compressMessage.y);
            break;
          }
        }
        break;
      }
      case "stop":
        for (const player of this.engine.players) {
          if (player.name == compressMessage.id) {
            player.state = "Idle";
            if (compressMessage.g === 0) {
              player.joystick.w = false;
              player.order.splice(player.order.indexOf("top"), 1);
            }
            if (compressMessage.g === 1) {
              player.joystick.s = false;
              player.order.splice(player.order.indexOf("bottom"), 1);
            }
            if (compressMessage.g === 2) {
              player.joystick.a = false;
              player.order.splice(player.order.indexOf("left"), 1);
            }
            if (compressMessage.g === 3) {
              player.joystick.d = false;
              player.order.splice(player.order.indexOf("right"), 1);
            }
            const lastKey = player.order.at(-1);
            if (lastKey) {
              switch (lastKey) {
                case "top": {
                  player.gaze = "top";
                  break;
                }
                case "bottom": {
                  player.gaze = "bottom";
                  break;
                }
                case "left": {
                  player.gaze = "left";
                  break;
                }
                case "right": {
                  player.gaze = "right";
                  break;
                }
              }
            }
            break;
          }
        }
        break;
      case "logout":
        this.engine.removePlayerByName(compressMessage.id);
        break;
      case "login":
        this.engine.eventManager.emit(`loginUser`, {
          id: compressMessage.id,
          x: compressMessage.x,
          y: compressMessage.y,
        });
        break;
      case "add": {
        const newPlayer = new Player(compressMessage.id);
        newPlayer.setPosition(compressMessage.x, compressMessage.y);
        this.engine.addPlayer(newPlayer);
        break;
      }
      default:
        for (const player of this.engine.players) {
          if (player.name == compressMessage.id) {
            const speed = player.increaseSpeed;
            if (compressMessage.xy === 0) {
              player.move(0, -speed);
              player.gaze = "top";
              player.state = "Move";
              if (!player.order.includes("top")) {
                player.order.push("top");
              }
            } else if (compressMessage.xy === 1) {
              player.move(0, speed);
              player.gaze = "bottom";
              player.state = "Move";
            } else if (compressMessage.xy === 2) {
              player.move(-speed, 0);
              player.gaze = "left";
              player.state = "Move";
            } else if (compressMessage.xy === 3) {
              player.move(speed, 0);
              player.gaze = "right";
              player.state = "Move";
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

  destroy() {
    this.socket.close(1000);
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
