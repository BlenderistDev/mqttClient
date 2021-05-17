import mqtt from 'mqtt';
import EventEmitter from 'events';
import { getConfig } from './Config.js'

const config = getConfig('Mqtt')
const mqttClient = new EventEmitter()

const connection = mqtt.connect(config.host, {
  username: config.username,
  password: config.password
})

connection.on('connect', () => connection.subscribe('#', { qos: 2 }))
connection.on('message', (topic, message, packet) => mqttClient.emit('message', {
    topic: topic.toString(),
    message: message.toString(),
    retain: packet.retain,
    qos: packet.qos,
    date: new Date()
  })
)
connection.on('error', (error) => console.error(error.message))

mqttClient.sendMessage = (message) => connection.publish(message.topic, message.message, {
  qos: parseInt(message.qos ? message.qos : 0),
  retain: message.retain ? message.retain : false
})

export {mqttClient}
