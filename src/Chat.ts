import WebSocket from "ws";
import { WebSocketServer } from "ws";
import Logged, { Datas } from "./Logged/Logged";
import dotenv from "dotenv";

dotenv.config();

const Logged_Users = new Logged();
const BaseSocket = new WebSocketServer({ port: 5050 });

BaseSocket.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (message: string | Buffer) => {
    try {
      const raw = typeof message === "string" ? message : message.toString();
      const datas: Datas = JSON.parse(raw);
      Logged_Users.add(datas, ws);
      console.log("Received message from:", datas.From);
    } catch (error) {
      console.error("Invalid message received:", message);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});

BaseSocket.on("listening", () => {
  console.log("WebSocket server listening on port 5050");
});
