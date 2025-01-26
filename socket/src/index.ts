/* A quite detailed WebSockets example */

import uWS from "uWebSockets.js";
import zlib from "zlib";
import { globalChannel } from "./global";
import SocketManager from "./model/SocketManager";
import Pako from "pako";

const port = 9001;

// const LoginMessage = new Protobuf.Type("LoginMessage")
//   .add(new Protobuf.Field("type", 1, "string"))
//   .add(new Protobuf.Field("id", 2, "string"))
//   .add(new Protobuf.Field("pw", 3, "string"));

// const LocationMessage = new Protobuf.Type("LocationMessage")
//   .add(new Protobuf.Field("type", 1, "string"))
//   .add(new Protobuf.Field("id", 2, "string"))
//   .add(new Protobuf.Field("x", 3, "float"))
//   .add(new Protobuf.Field("y", 4, "float"));

// const ResponseMessage = new Protobuf.Type("ResponseMessage")
//   .add(new Protobuf.Field("type", 1, "string"))
//   .add(new Protobuf.Field("data", 2, "bytes"));

const mockUserData = {
  test: {
    password: "1234",
  },
  test2: {
    password: "1234",
  },
};

const userList: WeakMap<uWS.WebSocket<any>, SocketManager> = new WeakMap();

type MockUserKey = keyof typeof mockUserData;

const app = uWS
  ./*SSL*/ App({
    key_file_name: "misc/key.pem",
    cert_file_name: "misc/cert.pem",
    passphrase: "1234",
  })
  .ws<{ myData: string }>("/*", {
    /* Options */
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    /* Handlers */
    upgrade: (res, req, context) => {
      console.log(
        "An Http connection wants to become WebSocket, URL: " +
          req.getUrl() +
          "!"
      );

      /* This immediately calls open handler, you must not use res after this call */
      res.upgrade(
        {
          myData:
            req.getUrl() /* First argument is UserData (see WebSocket.getUserData()) */,
        },
        /* Spell these correctly */
        req.getHeader("sec-websocket-key"),
        req.getHeader("sec-websocket-protocol"),
        req.getHeader("sec-websocket-extensions"),
        context
      );
    },
    open: (ws) => {
      const newUser = new SocketManager(ws);
      userList.set(ws, newUser);
      ws.subscribe("move");
      ws.subscribe("world");

      const { myData } = ws.getUserData();
      console.log("A WebSocket connected with URL: " + myData);

      const activeChannel = globalChannel.addUserToActiveChannel(newUser);

      if (activeChannel) {
        const payload = activeChannel.userList
          .filter((user) => user.ws !== ws && user.id)
          .map((user) => ({
            id: user.id,
            position: { ...user.position },
          }));
        const compressMessage = Pako.deflate(
          JSON.stringify({ type: "init", users: payload || [] })
        );
        ws.send(compressMessage, true);
      }

      console.log("채널 사이즈:", globalChannel.channelSize);
      console.log("유저 사이즈:", globalChannel.userSize);
    },
    message: (ws, message, isBinary) => {
      /* Ok is false if backpressure was built up, wait for drain */
      const messageBuffer = new Uint8Array(Buffer.from(message));
      // console.log(message, zlib.inflate(messageBuffer));
      const buffer = Pako.inflate(messageBuffer, {
        to: "string",
      }); /* , (err, buffer) => {
        // if (err) {
        //   console.log("압축 해제 오류:", err);
        //   return;
        // }
        // const message = JSON.parse(buffer.toString("utf-8"));
        // // console.log(message);
        // switch (message.type) {
        //   case "login": {
        //     // console.log(1);
        //     const id = (message.id || "") as MockUserKey;
        //     if (message.pw === mockUserData[id]?.["password"]) {
        //       const data = { type: message.type, result: true, id };
        //       const worldData = {
        //         type: "login",
        //         id,
        //       };
        //       const compress = JSON.stringify(data);
        //       // Pako.deflate(compress);
        //       ws.send(Pako.deflate(compress), isBinary);
        //       globalChannel.setUserId(ws, { id });
        //       ws.publish("world", Pako.deflate(compress));

        //       // zlib.deflate(JSON.stringify(data), (err, compress) => {
        //       //   ws.send(compress, isBinary);
        //       //   globalChannel.setUserId(ws, { id });
        //       //   zlib.deflate(JSON.stringify(worldData), (err, compress) => {
        //       //     ws.publish("world", compress);
        //       //   });
        //       // });
        //     } else {
        //       const data = { type: message.type, result: false };
        //       zlib.deflate(JSON.stringify(data), (err, compress) => {
        //         ws.send(compress, isBinary);
        //       });
        //     }
        //     break;
        //   }
        //   default:
        //     const id = globalChannel.findUserBySocket(ws);
        //     const data = {
        //       id,
        //       xy: message.xy,
        //     };
        //     zlib.deflate(JSON.stringify(data), (err, compress) => {
        //       ws.publish("move", compress);
        //     });

        //     break;
        //     // break;
        // }
      }) */
      const decodeMessage = JSON.parse(buffer);
      console.log(decodeMessage);
      switch (decodeMessage.type) {
        case "forward": {
          const user = globalChannel.findUserBySocket(ws);
          if (!user) return;
          const data = {
            type: "forward",
            id: user.id,
            mapName: decodeMessage.mapName,
            x: decodeMessage.x,
            y: decodeMessage.y,
          };
          const compress = Pako.deflate(JSON.stringify(data));
          ws.publish("world", compress, true);
          break;
        }
        case "stop": {
          const user = globalChannel.findUserBySocket(ws);
          if (!user) return;
          const data = {
            type: "stop",
            id: user.id,
            g: decodeMessage.g,
          };
          const compress = Pako.deflate(JSON.stringify(data));
          ws.publish("world", compress, true);
          break;
        }
        case "login": {
          const id = (decodeMessage.id || "") as MockUserKey;
          if (decodeMessage.pw === mockUserData[id]?.["password"]) {
            const data = {
              type: decodeMessage.type,
              result: true,
              id,
              x: decodeMessage.x,
              y: decodeMessage.y,
            };
            const addData = {
              type: "add",
              result: true,
              id,
              x: decodeMessage.x,
              y: decodeMessage.y,
            };
            const compress = JSON.stringify(data);
            const compress2 = JSON.stringify(addData);
            ws.send(Pako.deflate(compress), isBinary);
            globalChannel.setUserId(ws, { id });
            ws.publish("world", Pako.deflate(compress2), isBinary);
          } else {
            const data = { type: decodeMessage.type, result: false };
            const compress = Pako.deflate(
              JSON.stringify(data) /* , (err, compress) => {
              ws.send(compress, isBinary);
            } */
            );
            ws.send(compress, isBinary);
          }
          break;
        }
        default:
          const user = globalChannel.findUserBySocket(ws);
          if (!user) return;
          const data = {
            id: user.id,
            xy: decodeMessage.xy,
          };
          switch (decodeMessage.xy) {
            case 0:
              globalChannel.updateUserPosition(ws, 0, -1);
              break;
            case 1:
              globalChannel.updateUserPosition(ws, 0, 1);
              break;
            case 2:
              globalChannel.updateUserPosition(ws, -1, 0);
              break;
            case 3:
              globalChannel.updateUserPosition(ws, 1, 0);
              break;
          }
          const compress = Pako.deflate(
            JSON.stringify(data) /* , (err, compress) => {
            ws.publish("move", compress);
          } */
          );
          ws.publish("move", compress, true);
          break;
      }
    },
    drain: (ws) => {
      console.log("WebSocket backpressure: " + ws.getBufferedAmount());
    },
    close: (ws, code, message) => {
      console.log("WebSocket closed");
      console.log("채널 사이즈:", globalChannel.channelSize);
      console.log("유저 사이즈:", globalChannel.userSize);

      const user = globalChannel.findUserBySocket(ws);
      console.log(user);
      if (user) {
        app.publish(
          "world",
          Pako.deflate(JSON.stringify({ type: "logout", id: user.id })),
          true
        );
        globalChannel.removeUserFromChannel(ws);
      }
    },
  })
  .listen(port, (token) => {
    if (token) {
      console.log("Listening to port " + port);
    } else {
      console.log("Failed to listen to port " + port);
    }
  });
