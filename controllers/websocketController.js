const WebSocket = require('ws');
const Product = require('../models/Product'); // Adjust path as needed

let wss;

const initWebSocket = (server) => {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New client connected');
        ws.on('message', (message) => {
            console.log(`Received message => ${message}`);
        });
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

// Broadcast function to send data to all clients
const broadcast = (data) => {
    if (wss) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
};

// Example of broadcasting data (you can call this from your routes)
const sendProductUpdates = async () => {
    try {
        const products = await Product.find();
        broadcast({ type: 'PRODUCTS_UPDATE', data: products });
    } catch (err) {
        console.error('Error fetching products:', err);
    }
};

module.exports = { initWebSocket, sendProductUpdates };

