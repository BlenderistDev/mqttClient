import mqtt from 'mqtt';
import { moduleClient, connectClient } from '../../../Components/SocketClient.js'
import { config } from "../../../Components/ModuleConfig.js";
import { getConnectionOptions } from '../../../Components/MqttConnection.js';

const connection = mqtt.connect(config.host, getConnectionOptions(config))

connection.on('connect', () => {
    connectClient.send()
    connection.subscribe('#', { qos: 2 })
})

connection.on('message', (topic, message, packet) => moduleClient.send({
    topic: topic.toString(),
    message: message.toString(),
    retain: packet.retain,
    qos: packet.qos,
    date: new Date()
  })
)
connection.on('error', (error) => console.error(error.message))

moduleClient.on('message', message => connection.publish(message.topic, message.message, {
  qos: parseInt(message.qos ? message.qos : 0),
  retain: message.retain ? message.retain : false
}))
