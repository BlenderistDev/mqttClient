const Sequelize = require('sequelize');
const path = require('path');
const ModelPrototype = require(path.join(process.env.SOURCE_DIR, 'Database', 'ModelPrototype'));

const sequelize = ModelPrototype.sequelize;

/**
 * Модель для подписчика командной строки
 */
class ShellSubscriptions extends ModelPrototype {
  /**
   * Возвращает записи по команде cmd
   * @param {string} sCmd
   * @return {promise}
   */
  getByCmd(sCmd) {
    return ShellSubscriptions.findAll({where: {cmd: sCmd}});
  }
}

ShellSubscriptions.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  cmd: {type: Sequelize.TEXT},
  commandTemplate: {type: Sequelize.TEXT},
}, {sequelize, modelName: 'shell_subscriptions'});

module.exports = new ShellSubscriptions();
module.exports.sync = ShellSubscriptions;
