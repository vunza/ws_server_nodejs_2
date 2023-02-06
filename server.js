// Importing the required modules
const WebSocketServer = require('ws');
const path = require('path');
const express = require('express');
const app = express();
 
// Creating a new websocket server
app.set('porto', process.env.PORT || 3000);
const wss = new WebSocketServer.Server({ port: app.get('porto') })

 
// Creating connection using websocket
wss.on("connection", (ws) => {
    //console.log("new client connected");
    
    // sending message
    ws.on("message", (data) => {
        //console.log(`Client has sent us: ${data}`);
        
        // Envia msg a todos clientes
        wss.clients.forEach(client => {
            client.send(`${data}`);
        });       
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("Cliente Disconectado!");
    });

    // handling client connection error
    ws.onerror = function () {
        console.log("ERRO!");
    }
});

console.log(`Servidor WS inicializado na porta: ${app.get('porto')}`);
