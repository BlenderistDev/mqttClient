import mqtt from 'mqtt';
import { socket } from '../../core/SocketClient.js'

const config = JSON.parse(process.argv[2]);

const connection = mqtt.connect(config.host, {
  username: config.username,
  password: config.password
})

connection.on('connect', () => connection.subscribe('#'))
connection.on('message', (topic, message) => socket.emit('mqtt', {
  topic: topic.toString(),
  message: message.toString()
}))
connection.on('error', (error) => console.error(error.message))

socket.on('sendMqtt', (message) =>  connection.publish(message.topic.toString(), message.message.toString(), { retain: message.retain }))
