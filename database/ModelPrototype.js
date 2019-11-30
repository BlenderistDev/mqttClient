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
}

module.exports = ModelPrototype;
module.exports.sequelize = sequelize;
