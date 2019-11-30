const Sequelize = require('sequelize');
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
    return Subscriptions.findAll({where: {topic: topic}});
  }
}

Subscriptions.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  topic: {type: Sequelize.TEXT},
  module: {type: Sequelize.TEXT},
}, {sequelize, modelName: 'subscriptions'});

module.exports = new Subscriptions();
module.exports.sync = Subscriptions;
