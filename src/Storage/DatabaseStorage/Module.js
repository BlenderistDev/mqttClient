import { mqttClient } from '../../Components/SocketClient.js'
import { config } from "../../Components/ModuleConfig.js";
import Sequelize from 'sequelize';

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  logging:false
});

class Messages extends Sequelize.Model {}

Messages.init({
  topic: Sequelize.DataTypes.STRING,
  message: Sequelize.DataTypes.STRING,
  qos: Sequelize.DataTypes.INTEGER,
  date: Sequelize.DataTypes.DATE
}, { sequelize, modelName: config.table });


sequelize.sync();

let messages = []
mqttClient.on('message', message => messages.push(message))

const flushMessages = () => {
  const flushed = messages
  messages = []
  return flushed
}

setInterval(() => {
  const messages = flushMessages()
  Messages.bulkCreate(messages)
}, 10000)

