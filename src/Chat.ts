import WebSocket from "ws";
import { WebSocketServer } from "ws";
import Logged from "./Logged/Logged";
import { Datas } from "./Logged/Logged";

const Logged_Users = new Logged();
const BaseSocket: WebSocket.Server = new WebSocketServer({ port: 5050 });

BaseSocket.on("connection", (ws: WebSocket) => {
  console.log("Open");
  ws.on("message", (message: string) => {
    try {
      let datas: Datas = JSON.parse(message);
      Logged_Users.add(datas, ws);
    } catch (error) {}
    console.log("message");
  });
  ws.on("close", () => {});
  ws.on("error", () => {});
});

BaseSocket.on("listening", () => {
  console.log("Opend for");
});
