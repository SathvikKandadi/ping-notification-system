import { v4 as uuidv4 } from 'uuid';
import { WebSocket } from 'ws';

export class ConnectionManager {
    private clients:Map<string,WebSocket>;

    constructor()
    {
        this.clients = new Map();
    }

    createUniqueId(ws : WebSocket)
    {
        const id = uuidv4();

        this.clients.set(id,ws);

        return id;
    }

    getClient(id : string)
    {
        return this.clients.get(id);
    }

    deleteId(id : string)
    {
        this.clients.delete(id);
        console.log(`Id ${id} has been successfully deleted`);
    }
}