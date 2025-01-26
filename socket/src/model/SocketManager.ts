import uWS from "uWebSockets.js";

type XY = {
  x: number;
  y: number;
};

export default class SocketManager<T = any> {
  id!: string;
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

  setId(id: string) {
    this.id = id;
  }

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }
}
