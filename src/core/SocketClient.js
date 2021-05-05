import { io } from "socket.io-client";
import EventEmitter from 'events';

const config = JSON.parse(process.argv[2]);

export const socket = io('http://localhost:4000', {
  query: {
    module: config.name
  }
});

export const getMqttClient = () => {
  const mqttClient = new EventEmitter()
  socket.on("mqtt", (data) => {
    mqttClient.emit('message', data.topic, data.message);
  })
  mqttClient.sendMessage = (topic, message, retain = false) => socket.emit('sendMqtt', {
    topic: topic,
    message: message,
    retain: retain
  })
  return mqttClient
}
