import Sequelize from 'sequelize';
import {getConnection} from './DatabaseClient.js';

/**
 * Прототип модели
 */
export class ModelPrototype extends Sequelize.Model {
  /**
   * @param {bool} asArray
   * @return {Promise}
   * return all table data
   */
  static getTable() {
    return this.findAll();
  }

  /**
   * Удаляет запись по значению первичного ключа
   * @param {mixed} mPk
   * @return {Promise}
   */
  static removeByPk(mPk) {
    return this.findByPk(mPk).then((oRow) => {
      return oRow.destroy();
    });
  }

  /**
   * Возвращает запись по первичному ключу
   * @param {mixed} mPk
   * @return {Promise}
   */
  static getByPk(mPk) {
    return this.findByPk(mPk);
  }

  /**
   * Возвращает подключение к базе
   * @return {object}
   */
  static getSequelize() {
    return getConnection();
  }
}

