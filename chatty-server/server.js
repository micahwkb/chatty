const express      = require('express');
const SocketServer = require('ws').Server;
const uuid         = require('node-uuid');
const PORT         = 4000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`listening on ${PORT}`));

const wss = new SocketServer({ server });

// send total user count to all clients
broadcastUserCount = () => {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({
      type: 'userCount',
      count: wss.clients.length
    }));
  })
}

wss.on('connection', (ws) => {

  console.log('Client connected');
  broadcastUserCount();

  ws.on('message', (event) => {
    const messageBody = JSON.parse(event)
    // assign unique id to incoming message
    messageBody.id = uuid.v1();
    // broadcast new message to all clients
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(messageBody));
    });
  });

  ws.on('close', () => {
    broadcastUserCount();
    console.log('Client disconnected');
  });

})