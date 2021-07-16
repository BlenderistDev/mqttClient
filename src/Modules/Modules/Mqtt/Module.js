import mqtt from 'mqtt';
import { moduleClient } from '../../../Components/SocketClient.js'
import { config } from "../../../Components/ModuleConfig.js";
import * as R from 'ramda'

const getConnectionOptions = R.pipe(
  R.set(R.lensProp('username'), config.username),
  R.set(R.lensProp('password'), config.password),
  R.reject(R.either(R.isEmpty, R.isNil))
)

const connection = mqtt.connect(config.host, getConnectionOptions({}))

connection.on('connect', () => connection.subscribe('#', { qos: 2 }))
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
