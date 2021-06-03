import EventEmitter from 'events';

export const notificationEmitter = new EventEmitter()
export const sendNotification = notification => {
  console.error(notification)
  notificationEmitter.emit('message', notification)
}