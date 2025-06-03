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
  emitOpenResolver: Promise<boolean> | null = null;
  emitOpen: (value: boolean) => void = () => {};
  eventMap: Map<string, ((socket: this, compressMessage: any) => void)[]> =
    new Map();
  // isOpen: boolean = false;

  constructor(engine: GameEngine) {
    this.engine = engine;

    const websocket = new WebSocket(this.url);
    websocket.binaryType = "arraybuffer";
    websocket.onopen = this.open.bind(this);
    websocket.onmessage = this.message.bind(this);
    websocket.onerror = this.error.bind(this);
    websocket.onclose = this.close.bind(this);
    this.socket = websocket;
    this.emitOpenResolver = new Promise((resolve) => (this.emitOpen = resolve));
    this.initializeListener();
  }

  async open(e: Event) {
    console.log(e);
    // this.isOpen = true;
    this.emitOpen(true);
  }

  on(
    eventName: string,
    callback: (socket: this, compressMessage: any) => void
  ) {
    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, []);
    }
    const event = this.eventMap.get(eventName);
    if (event) {
      if (!event.includes(callback)) {
        event.push(callback);
      }
    }
  }

  initializeListener() {
    this.on("init", (socket, compressMessage) => {
      compressMessage.users.forEach((user: any) => {
        const player = new Player(user.id);
        player.setPosition(user.position.x, user.position.y);
        this.engine.addPlayer(player);
      });
    });
    this.on("forward", (socket, compressMessage) => {
      for (const player of this.engine.players) {
        if (player.name === compressMessage.id) {
          player.location.locate = compressMessage.mapName;
          player.setPosition(compressMessage.x, compressMessage.y);
          break;
        }
      }
    });
    this.on("stop", (socket, compressMessage) => {
      for (const player of this.engine.players) {
        console.log("🚀 ~ Socket ~ this.on ~ player:", player);
        console.log(
          "🚀 ~ Socket ~ this.on ~ compressMessage:",
          compressMessage
        );
        if (player.name === compressMessage.id) {
          console.log(
            "🚀 ~ Socket ~ this.on ~ compressMessage:",
            compressMessage
          );
          console.log("🚀 ~ Socket ~ this.on ~ player:", player);
          player.state = "Idle";
          if (compressMessage.g === 0) {
            player.joystick.w = false;
            player.order.splice(player.order.indexOf("top"), 1);
            player.state = "Idle";
          }
          if (compressMessage.g === 1) {
            player.joystick.s = false;
            player.order.splice(player.order.indexOf("bottom"), 1);
            player.state = "Idle";
          }
          if (compressMessage.g === 2) {
            player.joystick.a = false;
            player.order.splice(player.order.indexOf("left"), 1);
            player.state = "Idle";
          }
          if (compressMessage.g === 3) {
            player.joystick.d = false;
            player.order.splice(player.order.indexOf("right"), 1);
            player.state = "Idle";
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
          player.state = "Idle";
          break;
        }
      }
    });
    this.on("logout", (socket, compressMessage) => {
      this.engine.removePlayerByName(compressMessage.id);
    });
    this.on("login", (socket, compressMessage) => {
      const isAllowed = compressMessage.result;
      console.log("🚀 ~ Socket ~ message ~ isAllowed:", isAllowed);
      if (isAllowed) {
        this.engine.eventManager.emit(`loginUser`, {
          id: compressMessage.id,
          x: compressMessage.x,
          y: compressMessage.y,
        });
      } else {
        alert(
          "계정 정보를 찾을 수 없습니다. 아이디와 비밀번호를 확인해주세요."
        );
      }
    });
    this.on("add", (socket, compressMessage) => {
      const newPlayer = new Player(compressMessage.id);
      newPlayer.setPosition(compressMessage.x, compressMessage.y);
      this.engine.addPlayer(newPlayer);
    });
  }

  message(message: MessageEvent) {
    const compressedData = new Uint8Array(message.data);

    const compressMessage = JSON.parse(
      Pako.inflate(compressedData, { to: "string" })
    );
    // console.log(compressMessage)

    const events = this.eventMap.get(compressMessage.type);
    console.log("🚀 ~ Socket ~ message ~ compressMessage:", compressMessage);

    if (events) {
      events?.forEach((event) => event(this, compressMessage));
    } else {
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
    }

    // switch (compressMessage.type) {
    // case "init": {
    //   compressMessage.users.forEach((user: any) => {
    //     const player = new Player(user.id);
    //     player.setPosition(user.position.x, user.position.y);
    //     this.engine.addPlayer(player);
    //   });
    //   break;
    // }
    // case "forward": {
    //   for (const player of this.engine.players) {
    //     if (player.name === compressMessage.id) {
    //       player.location.locate = compressMessage.mapName;
    //       player.setPosition(compressMessage.x, compressMessage.y);
    //       break;
    //     }
    //   }
    //   break;
    // }
    // case "stop":
    // for (const player of this.engine.players) {
    //   if (player.name == compressMessage.id) {
    //     player.state = "Idle";
    //     if (compressMessage.g === 0) {
    //       player.joystick.w = false;
    //       player.order.splice(player.order.indexOf("top"), 1);
    //     }
    //     if (compressMessage.g === 1) {
    //       player.joystick.s = false;
    //       player.order.splice(player.order.indexOf("bottom"), 1);
    //     }
    //     if (compressMessage.g === 2) {
    //       player.joystick.a = false;
    //       player.order.splice(player.order.indexOf("left"), 1);
    //     }
    //     if (compressMessage.g === 3) {
    //       player.joystick.d = false;
    //       player.order.splice(player.order.indexOf("right"), 1);
    //     }
    //     const lastKey = player.order.at(-1);
    //     if (lastKey) {
    //       switch (lastKey) {
    //         case "top": {
    //           player.gaze = "top";
    //           break;
    //         }
    //         case "bottom": {
    //           player.gaze = "bottom";
    //           break;
    //         }
    //         case "left": {
    //           player.gaze = "left";
    //           break;
    //         }
    //         case "right": {
    //           player.gaze = "right";
    //           break;
    //         }
    //       }
    //     }
    //     break;
    //   }
    // }
    // break;
    // case "logout":
    //   this.engine.removePlayerByName(compressMessage.id);
    //   break;
    // case "login": {
    //   const isAllowed = compressMessage.result;
    //   console.log("🚀 ~ Socket ~ message ~ isAllowed:", isAllowed);
    //   if (isAllowed) {
    //     this.engine.eventManager.emit(`loginUser`, {
    //       id: compressMessage.id,
    //       x: compressMessage.x,
    //       y: compressMessage.y,
    //     });
    //   }

    //   alert(
    //     "계정 정보를 찾을 수 없습니다. 아이디와 비밀번호를 확인해주세요."
    //   );
    //   break;
    // }
    // case "add": {
    //   const newPlayer = new Player(compressMessage.id);
    //   newPlayer.setPosition(compressMessage.x, compressMessage.y);
    //   this.engine.addPlayer(newPlayer);
    //   break;
    // }
    // default:
    //   console.log("뭐지?", compressMessage);
    //   for (const player of this.engine.players) {
    //     if (player.name == compressMessage.id) {
    //       const speed = player.increaseSpeed;
    //       if (compressMessage.xy === 0) {
    //         player.move(0, -speed);
    //         player.gaze = "top";
    //         player.state = "Move";
    //         if (!player.order.includes("top")) {
    //           player.order.push("top");
    //         }
    //       } else if (compressMessage.xy === 1) {
    //         player.move(0, speed);
    //         player.gaze = "bottom";
    //         player.state = "Move";
    //       } else if (compressMessage.xy === 2) {
    //         player.move(-speed, 0);
    //         player.gaze = "left";
    //         player.state = "Move";
    //       } else if (compressMessage.xy === 3) {
    //         player.move(speed, 0);
    //         player.gaze = "right";
    //         player.state = "Move";
    //       }
    //       break;
    //     }
    //   }
    //   break;
    // }
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
