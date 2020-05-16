const Sequelize = require('sequelize');
const sequelize = require('./DatabaseClient');

/**
 * Прототип модели
 */
class ModelPrototype extends Sequelize.Model {
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
}

module.exports = ModelPrototype;
module.exports.sequelize = sequelize;
