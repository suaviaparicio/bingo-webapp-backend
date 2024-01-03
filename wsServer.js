const WebSocket = require('ws');

let wss;

function initialize(httpServer) {
    wss = new WebSocket.Server({ server: httpServer });
    console.log('ws server initialized')

    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.on('close', () => console.log('Client disconnected'));
    });
}

function broadcastDrawnNumber(number) {
    const message = JSON.stringify({ type: 'DRAWN_NUMBER', data: number });
    broadcast(message);
}

function broadcastStartGameCounter(counter) {
    const message = JSON.stringify({ type: 'COUNTER', data: counter });
    broadcast(message);
}

function broadcastCurrentUserList(users) {
    const message = JSON.stringify({ type: 'CURRENT_USERS', data: users });
    broadcast(message);
}

function broadcast(message) {
    if (!wss) {
        throw new Error('WebSocket server is not initialized');
    }

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

module.exports = { initialize, broadcastDrawnNumber, broadcastStartGameCounter, broadcastCurrentUserList, broadcast };
