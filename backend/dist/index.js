"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
    ws.on('error', console.error);
    console.log("Connection established");
    ws.on('message', (message) => {
        const messageStr = message.toString();
        console.log(`Received message: ${messageStr}`);
        const msg = JSON.parse(messageStr);
        if (msg.type === 'notify') {
            ws.send(JSON.stringify({
                type: "notify",
                payload: msg.payload
            }));
        }
    });
    ws.on('close', () => {
        console.log("Connection closed");
    });
});
