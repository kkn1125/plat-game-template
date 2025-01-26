import uWS from "uWebSockets.js";
import { v4 } from "uuid";
import SocketManager from "./SocketManager";

class Channel {
  name: string;
  limit: number = 10;
  userList: SocketManager[] = [];

  constructor(name: string) {
    this.name = name;
  }

  get isFull() {
    return this.userList.length >= this.limit;
  }

  setUserId(user: uWS.WebSocket<any>, data: any) {
    const socketUser = this.findUser(user);
    socketUser?.setId(data.id);
  }

  addUser(data: SocketManager) {
    this.userList.push(data);
  }

  findUser(user: uWS.WebSocket<any>) {
    return this.userList.find((item) => item.ws === user);
  }

  hasUser(user: uWS.WebSocket<any>) {
    return this.userList.some((item) => item.ws === user);
  }

  removeUser(user: uWS.WebSocket<any>) {
    this.userList = this.userList.filter((item) => item.ws !== user);
  }

  setLimit(limit: number) {
    this.limit = limit;
  }
}

export default class GlobalChannel {
  static get Channel() {
    return Channel;
  }

  channel: Channel[] = [];

  get isFullChannel() {
    return this.channel.every((channel) => channel.isFull);
  }

  get activeChannel() {
    return this.channel.find((channel) => !channel.isFull);
  }

  get channelSize() {
    return this.channel.length;
  }

  get userSize() {
    return this.channel.reduce(
      (acc, channel) => acc + channel.userList.length,
      0
    );
  }

  constructor() {}

  setUserId(user: uWS.WebSocket<any>, data: any) {
    this.findUserBySocket(user)?.setId(data.id);
  }

  updateUserPosition(ws: uWS.WebSocket<any>, x: number, y: number) {
    this.findUserBySocket(ws)?.setPosition(x, y);
  }

  findChannelByUser(user: uWS.WebSocket<any>) {
    return this.channel.find((channel) => channel.hasUser(user));
  }

  findUserBySocket(user: uWS.WebSocket<any>) {
    const channel = this.findChannelByUser(user);
    return channel?.findUser(user);
  }

  hasUser(user: uWS.WebSocket<any>) {
    return this.channel.some((channel) => channel.hasUser(user));
  }

  createChannel(name: string) {
    if (this.channel.some((channel) => channel.name === name)) {
      return false;
    } else {
      this.channel.push(new Channel(name));
      return true;
    }
  }

  addUserToActiveChannel(data: SocketManager) {
    if (!this.activeChannel) {
      this.createChannel(`ch-${v4()}`);
    }
    this.activeChannel?.addUser(data);
    return this.activeChannel;
  }

  removeUserFromChannel(user: uWS.WebSocket<any>) {
    const channel = this.findChannelByUser(user);
    if (channel) {
      channel.removeUser(user);
    }
  }
}
