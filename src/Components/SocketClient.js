import { io } from "socket.io-client";
import EventEmitter from 'events';

const config = JSON.parse(process.argv[2]);

const socket = io('http://localhost:4000', {
  query: {
    module: config.name
  }
});

const getClient = (path, send) => {
  const client = new EventEmitter()
  socket.on(path, data => client.emit('message', data))
  client.send = send
  return client;
}

export const notificationClient = getClient('notification', (data) => {
  console.error(data)
  socket.emit('notification', data)
})

export const moduleClient = getClient('data', (data) => socket.emit('data', data))

export const mqttClient = getClient('mqtt',
  (topic, message, retain = false) => socket.emit('mqtt', {
    topic: topic,
    message: message,
    retain: retain
  })
)
