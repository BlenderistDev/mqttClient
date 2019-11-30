const Sequelize = require('sequelize');
const ModelPrototype = require('../../../database/ModelPrototype');

const sequelize = ModelPrototype.sequelize;

/**
 * Модель для подписчика командной строки
 */
class ShellSenders extends ModelPrototype {

}

ShellSenders.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  command: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  topic: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  interval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {sequelize, modelName: 'shell_senders'});

module.exports = new ShellSenders();
module.exports.sync = ShellSenders;
