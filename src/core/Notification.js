import EventEmitter from 'events';

export const notificationEmitter = new EventEmitter()
export const sendNotification = (module, message) => {
  console.error(`Error in module ${module}`)
  console.error(message)
  notificationEmitter.emit('message', {
    module: module,
    message: message
  })
}