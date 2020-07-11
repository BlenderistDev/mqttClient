const Sequelize = require('sequelize');
const ModelPrototype = require('../../../core/index').modelPrototype;

const sequelize = ModelPrototype.sequelize;

/**
 * Модель для модуля пинга
 */
class PingTable extends ModelPrototype {
  /**
   * Возвращает записи топику замера
   * @param {string} sCmd
   * @return {promise}
   */
  static getByMeasureTopic(sTopic) {
    return PingTable.findAll({where: {measure_topic: sTopic}});
  }
}

PingTable.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  measure_topic: {
    type: Sequelize.TEXT,
  },
  result_topic: {
    type: Sequelize.TEXT,
  },
  interval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {sequelize, modelName: 'message_ping'});

module.exports = PingTable;

