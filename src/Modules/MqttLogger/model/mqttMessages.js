const Sequelize = require('sequelize');
const ModelPrototype = require('../../../core/index').modelPrototype;

const sequelize = ModelPrototype.sequelize;

/**
 * Модель для подписчика командной строки
 */
class MqttMessages extends ModelPrototype {
}

MqttMessages.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  topic: {
    type: Sequelize.TEXT,
  },
  message: {
    type: Sequelize.TEXT,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {sequelize, modelName: 'mqtt_messages'});

module.exports = MqttMessages;
