"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const BaseSocket = new ws_1.WebSocketServer({ port: 5050 });
BaseSocket.on("connection", (ws) => {
    console.log("Open");
    ws.on("message", (message) => {
        console.log("message");
    });
    ws.on("close", () => { });
    ws.on("error", () => { });
});
BaseSocket.on("listening", () => {
    console.log("Opend for");
});
