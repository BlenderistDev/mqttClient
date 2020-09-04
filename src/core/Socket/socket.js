const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  console.log("connected");
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(5000);

setInterval(() => {
  // client.broadcast.json.send({'event': 'mqttMessage', 'name': 'azaza'});
  io.emit('mqttMessage', { my: 'data' });
  console.log("send");
}, 1000)