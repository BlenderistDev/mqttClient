const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ModelPrototype = require('../../../database/ModelPrototype');

const sequelize = ModelPrototype.sequelize;

/**
 * Модель для таблицы подписчиков
 */
class Subscriptions extends ModelPrototype {
  /**
   * Поиск записи по топику
   * @param {string} topic
   * @return {promise}
   */
  getByTopic(topic) {
    return Subscriptions.findAll({
      where: {
        [Op.or]: [{topic: topic}, {topic: '#'}],
      },
    });
  }
}

Subscriptions.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  topic: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  module: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {sequelize, modelName: 'subscriptions'});

module.exports = new Subscriptions();
module.exports.sync = Subscriptions;
