import { notificationEmitter } from '../core/Notification.js'

const mqttGatewayGroup = 'mqttGateway'
const mqttListenerGroup = 'mqttListener'
const frontendGroup = 'frontend'

export const socketHandler = (socket) => {
  const module = socket.handshake.query.module
  if (module === 'Mqtt') {
    socket.join(mqttGatewayGroup)
    socket.on('data', data => socket.to(mqttListenerGroup).emit('mqtt', data))
  } else {
    socket.on('mqtt', data => socket.to(mqttGatewayGroup).emit('data', data))
    socket.join(mqttListenerGroup)
    if (module) {
      socket.on('data', (data) => socket.to(frontendGroup).emit('data', {
        module: module,
        data: data
      }))
    }
    if (socket.handshake.query.frontend) {
      socket.join(frontendGroup)
      socket.on('data', data => socket.to(data.module).emit('data'. data.data))
      notificationEmitter.on('message', notification => socket.emit('notification', notification))
    }
  }
}
