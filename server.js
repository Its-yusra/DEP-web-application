const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Serve the index.html file
app.use(express.static(path.join(__dirname)));

// WebSocket server
wss.on('connection', socket => {
  console.log('Client connected');

  // Listen for messages from the client
  socket.on('message', message => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    // Send a notification to the client
    socket.send(`Notification: Message "${message}" received!`);
  });

  // Handle client disconnect
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
