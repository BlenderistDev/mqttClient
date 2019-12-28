const Sequelize = require('sequelize');
const ModelPrototype = require('../../../database/ModelPrototype');

const sequelize = ModelPrototype.sequelize;

/**
 * Модель для счетчика сообщений
 */
class MessageCounter extends ModelPrototype {
}

MessageCounter.init({
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
  interval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {sequelize, modelName: 'message_counter'});

module.exports = new MessageCounter();
module.exports.sync = MessageCounter;
