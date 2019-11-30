const Sequelize = require('sequelize');
const ModelPrototype = require('../../../database/ModelPrototype');

const sequelize = ModelPrototype.sequelize;

/**
 * bot options model
 */
class Subscriptions extends ModelPrototype {
  /**
   * @param {string} topic
   * @return {promise}
   */
  getByTopic(topic) {
    return Subscriptions.findAll({where: {topic: topic}}).then((res) => {
      return res;
    });
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
