import Sequelize from 'sequelize';
import {ModelPrototype} from '../../../core/index.js';

const sequelize = ModelPrototype.getSequelize();

/**
 * Модель для модуля пинга
 */
export class PingTable extends ModelPrototype {
  /**
   * Возвращает записи топику замера
   * @param {string} sTopic
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

