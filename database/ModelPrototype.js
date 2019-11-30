const Sequelize = require('sequelize');
const sequelize = require('./DatabaseClient');

/**
 * Прототип модели
 */
class ModelPrototype extends Sequelize.Model {

}

module.exports = ModelPrototype;
module.exports.sequelize = sequelize;
