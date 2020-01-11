const Sequelize = require('sequelize');
const path = require('path');
const ModelPrototype = require(path.join(process.env.SOURCE_DIR, 'Database', 'ModelPrototype'));

const sequelize = ModelPrototype.sequelize;

/**
 * Модель для подписчика командной строки
 */
class MqttMessages extends ModelPrototype {
  /**
   * Создает запись в таблице
   * @param {object} oData
   */
  create(oData) {
    MqttMessages.create(oData);
  }
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

module.exports = new MqttMessages();
module.exports.sync = MqttMessages;
