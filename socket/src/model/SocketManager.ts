import uWS from "uWebSockets.js";

type XY = {
  x: number;
  y: number;
};

export default class SocketManager<T = any> {
  id!: number;
  nickname!: string;
  ws: uWS.WebSocket<T>;
  position: XY = {
    x: 0,
    y: 0,
  };

  constructor(ws: uWS.WebSocket<T>) {
    this.ws = ws;
  }

  get data(): T {
    return this.ws.getUserData();
  }

  setId(id: number) {
    this.id = id;
  }

  setNickname(nickname: string) {
    this.nickname = nickname;
  }

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }

  updatePosition(x: number, y: number) {
    this.position.x += x;
    this.position.y += y;
  }
}
