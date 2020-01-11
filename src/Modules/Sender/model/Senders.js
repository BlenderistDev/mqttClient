const Sequelize = require('sequelize');
const path = require('path');
const ModelPrototype = require(path.join(process.env.SOURCE_DIR, 'Database', 'ModelPrototype'));

const sequelize = ModelPrototype.sequelize;

/**
 * Модель для таблицы отправителей
 */
class Senders extends ModelPrototype {

}

Senders.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  module: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {sequelize, modelName: 'senders'});

module.exports = new Senders();
module.exports.sync = Senders;
