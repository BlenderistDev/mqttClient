const Sequelize = require('sequelize');
const path = require('path');
const ModelPrototype = require(path.join(process.env.SOURCE_DIR, 'Database', 'ModelPrototype'));

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
