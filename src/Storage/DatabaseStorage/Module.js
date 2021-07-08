import { mqttClient } from '../../Components/SocketClient.js'
import { Messages } from './Messages.js';
import { sequelize } from "./Connection.js";

sequelize.sync();

let messages = []
mqttClient.on('message', message => messages.push(message))

const flushMessages = () => {
  const flushed = messages
  messages = []
  return flushed
}

setInterval(() => Messages.bulkCreate(flushMessages()), 10000)

