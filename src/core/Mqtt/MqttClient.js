import mqtt from 'mqtt';
import EventEmitter from 'events';
import { getConfig } from '../Config/Config.js'

const config = getConfig('mqtt')
const mqttClient = new EventEmitter()
const connection = mqtt.connect(config.host, {
  username: config.username,
  password: config.password
})
connection.on('connect', () => connection.subscribe('#'))
connection.on('message', (topic, message) => mqttClient.emit('message', topic.toString(), message.toString()))
mqttClient.sendMessage = (topic, message, retain = false) => connection.publish(topic.toString(), message.toString(), { retain: retain })

export {mqttClient}
export const mqttPrefix = config.topic