"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ConnectionManager_1 = require("./ConnectionManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const connectionManager = new ConnectionManager_1.ConnectionManager();
wss.on("connection", (ws) => {
    ws.on('error', console.error);
    console.log("Connection established");
    const id = connectionManager.createUniqueId(ws);
    ws.send(JSON.stringify({
        type: "id",
        uniqueId: id
    }));
    ws.on('message', (message) => {
        const messageStr = message.toString();
        console.log(`Received message: ${messageStr}`);
        try {
            const msg = JSON.parse(messageStr);
            if (msg.type === 'broadcast') {
                const sender = connectionManager.getClient(msg.from);
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN && client !== sender) {
                        client.send(JSON.stringify({ type: 'broadcast', from: msg.from, payload: msg.payload }));
                    }
                });
            }
            else if (msg.type === 'notify') {
                const recipient = connectionManager.getClient(msg.to);
                if (recipient && recipient.readyState === WebSocket.OPEN) {
                    recipient.send(JSON.stringify({ type: "notify", from: msg.from, payload: msg.payload }));
                }
            }
            else {
                console.log('Unknown message type:', msg.type);
            }
        }
        catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    ws.on('close', () => {
        console.log("Connection closed");
        connectionManager.deleteId(id);
    });
});
