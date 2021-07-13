import { mqttClient } from '../../../Components/SocketClient.js'
import { Messages } from './Messages.js';
import { sequelize } from "./Connection.js";
import { config } from "../../../Components/ModuleConfig.js";

sequelize.sync();

const interval = parseInt(config.interval)

if (interval > 0) {
  let messages = []
  mqttClient.on('message', message => messages.push(message))

  const flushMessages = () => {
    const flushed = messages
    messages = []
    return flushed
  }

  setInterval(() => Messages.bulkCreate(flushMessages()), config.interval * 1000)
} else {
  mqttClient.on('message', message => Messages.create(message))
}


