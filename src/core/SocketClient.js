import { io } from "socket.io-client";
import EventEmitter from 'events';

export const socket = io('http://localhost:4000');

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
