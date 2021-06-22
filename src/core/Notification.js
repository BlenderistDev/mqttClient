import EventEmitter from 'events';
import * as R from "ramda";

export const notificationEmitter = new EventEmitter()
export const sendNotification = R.curry((module, message) => {
  console.error(`Error in module ${module}`)
  console.error(message)
  notificationEmitter.emit('message', {
    module: module,
    message: message
  })
})
