import { mqttClient } from '../core/MqttClient.js'

export const socketHandler = (socket) => {
  mqttClient.on('message', data => socket.emit('mqtt', data))
  socket.on('mqtt', data => mqttClient.sendMessage(data))

  const module = socket.handshake.query.module
  if (module) {
    socket.on('data', (data) => socket.to('frontend').emit('data', {
      module: module,
      data: data
    }))
  }
  if (socket.handshake.query.frontend) {
    socket.join('frontend')
    socket.on('data', data => socket.to(data.module).emit('data'. data.data))
  }
}