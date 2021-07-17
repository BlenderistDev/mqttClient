import { mqttClient } from '../../../Components/SocketClient.js'
import { Messages } from './Messages.js';
import { sequelize } from "./Connection.js";
import { config } from "../../../Components/ModuleConfig.js";
import { Flushable } from "../../../Components/Flushable.js"

sequelize.sync();

const interval = parseInt(config.interval)

if (interval > 0) {
  const flushable = new Flushable()
  mqttClient.on('message', message => flushable.push(message))
  setInterval(() => Messages.bulkCreate(flushable.flush()), config.interval * 1000)
} else {
  mqttClient.on('message', message => Messages.create(message))
}
