import { config } from "../../../Components/ModuleConfig.js";
import mqtt from 'mqtt';
import match from 'mqtt-match'
import { mqttClient } from '../../../Components/SocketClient.js'

const connection = mqtt.connect(config.host, {
  username: config.username,
  password: config.password
})

if (config.direction === 'from') {
  connection.on('connect', () => connection.subscribe(config.topic, { qos: 2 }))
  connection.on('message', (topic, message, packet) => mqttClient.send(topic, message, packet.retain))
}

if (config.direction === 'to') {
  mqttClient.on('message', message => {
    if (match(config.topic, message.topic)) {
      connection.publish(message.topic, message.message, {
        qos: parseInt(message.qos ? message.qos : 0),
        retain: message.retain ? message.retain : false
      })
    }
  })
}
