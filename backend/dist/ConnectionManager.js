"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionManager = void 0;
const uuid_1 = require("uuid");
class ConnectionManager {
    constructor() {
        this.clients = new Map();
    }
    createUniqueId(ws) {
        const id = (0, uuid_1.v4)();
        this.clients.set(id, ws);
        return id;
    }
    getClient(id) {
        return this.clients.get(id);
    }
    deleteId(id) {
        this.clients.delete(id);
        console.log(`Id ${id} has been successfully deleted`);
    }
}
exports.ConnectionManager = ConnectionManager;
