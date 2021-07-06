import { notificationEmitter } from '../core/Notification.js'

const mqttGatewayGroup = 'mqttGateway'
const mqttListenerGroup = 'mqttListener'
const frontendGroup = 'frontend'
const mqttModule = 'Mqtt'
const mqttEventName = 'mqtt'
const dataEventName = 'data'
const notificationEventName = 'notification'

export const socketHandler = (socket) => {
  const module = socket.handshake.query.module
  if (module === mqttModule) {
    socket.join(mqttGatewayGroup)
    socket.on(dataEventName, data => socket.to(mqttListenerGroup).emit(mqttEventName, data))
  } else {
    socket.on(mqttEventName, data => socket.to(mqttGatewayGroup).emit(dataEventName, data))
    socket.join(mqttListenerGroup)
    if (module) {
      socket.on(dataEventName, (data) => socket.to(frontendGroup).emit(dataEventName, {
        module: module,
        data: data
      }))
    }
    if (socket.handshake.query.frontend) {
      socket.join(frontendGroup)
      socket.on(dataEventName, data => socket.to(data.module).emit(dataEventName. data.data))
      notificationEmitter.on('message', notification => socket.emit(notificationEventName, notification))
    }
  }
}
