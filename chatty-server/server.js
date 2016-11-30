const express      = require('express');
const SocketServer = require('ws').Server;
const PORT         = 4000;

// express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`listening on ${PORT}`));

// WebSockets server
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send('Server: yep.');
  // client opens socket connection
  ws.on('open', function(event) {
    console.log(event.data)
  });

  // client sends message
  ws.on('message', function(event) {
    ws.send(event.data);
    console.log(event);
  })

  // client closes socket
  ws.on('close', () => console.log('Client disconnected'));
})