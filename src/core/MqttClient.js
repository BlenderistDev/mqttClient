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
connection.on('message', (topic, message, packet) => {
  console.log(packet)
  mqttClient.emit('message', {
      topic: topic.toString(),
      message: message.toString(),
      retain: packet.retain,
      qos: packet.qos,
      date: new Date()
    })
  }
)
connection.on('error', (error) => console.error(error.message))

mqttClient.sendMessage =
  (topic, message, retain = true) => {
    connection.publish(topic.toString(), message.toString(), { qos: 2, retain: true })
  }

export {mqttClient}
