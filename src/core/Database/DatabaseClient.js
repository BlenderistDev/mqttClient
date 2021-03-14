import Sequelize from 'sequelize';
import { getConfigOption } from '../index.js'
import _ from 'lodash'

const getDatabaseOption = getConfigOption('database', false)

let connection;

/**
 * соединение с базой данных
 * @return {Sequelize}
 */
export function getConnection() {
  if (!_.isUndefined(connection)) {
    connection = new Sequelize(getDatabaseOption(dbname), getDatabaseOption(username), getDatabaseOption(password), {
      dialect: getDatabaseOption(dialect),
      host: getDatabaseOption(host),
      logging: false,
      define: {
        timestamps: false,
      },
    });
  }
  return connection;
}
