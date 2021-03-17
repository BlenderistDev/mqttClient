import Sequelize from 'sequelize';
import { getConfig } from '../index.js'
import _ from 'lodash'

const config = getConfig('database')

let connection;

/**
 * соединение с базой данных
 * @return {Sequelize}
 */
export function getConnection() {
  if (!_.isUndefined(connection)) {
    connection = new Sequelize(config.dbname, config.username, config.password, {
      dialect: config.dialect,
      host: config.host,
      logging: false,
      define: {
        timestamps: false,
      },
    });
  }
  return connection;
}
