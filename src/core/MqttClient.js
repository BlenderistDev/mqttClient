import mqtt from 'mqtt';
import EventEmitter from 'events';
import { getConfig } from './Config.js'

const config = getConfig('Mqtt')
const mqttClient = new EventEmitter()

const connection = mqtt.connect(config.host, {
  username: config.username,
  password: config.password
})
connection.on('connect', () => connection.subscribe('#'))
connection.on('message', (topic, message) => mqttClient.emit('message', {
  topic: topic.toString(),
  message: message.toString()
}))
connection.on('error', (error) => console.error(error.message))

mqttClient.sendMessage = (topic, message, retain = false) =>{
  connection.publish(topic.toString(), message.toString(), { retain: retain })
}

export {mqttClient}
export const mqttPrefix = config.topic
