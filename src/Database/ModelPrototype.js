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
  getTable() {
    return this.constructor.findAll();
  }
  /**
   * Создает запись в таблице
   * @param {object} oData
   * @return {Promise}
   */
  create(oData) {
    return this.constructor.create(oData);
  }

  /**
   * Удаляет запись по значению первичного ключа
   * @param {mixed} mPk
   * @return {Promise}
   */
  removeByPk(mPk) {
    return this.constructor.findByPk(mPk).then((oRow) => {
      return oRow.destroy();
    });
  }
}

module.exports = ModelPrototype;
module.exports.sequelize = sequelize;
