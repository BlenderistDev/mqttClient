import _ from "lodash";
import { config } from "../../Components/ModuleConfig.js";
import mqtt from 'mqtt';
import { mqttClient } from '../../Components/SocketClient.js'

_.map(config, row => {
  const connection = mqtt.connect(row.host, {
    username: row.username,
    password: row.password
  })

  if (row.direction === 'from') {
    connection.on('connect', () => connection.subscribe(row.topic, { qos: 2 }))
    connection.on('message', (topic, message, packet) => mqttClient.send(topic, message, packet.retain))
  }

  if (row.direction === 'to') {
    mqttClient.on('message', message => connection.publish(message.topic, message.message, {
       qos: parseInt(message.qos ? message.qos : 0),
      retain: message.retain ? message.retain : false
    }))
  }
})