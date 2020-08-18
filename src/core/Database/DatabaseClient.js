import Sequelize from 'sequelize';
// import {db} from './config/config.js';
import {db as dbConfig} from '../../../config/config.js';

let connection;

/**
 * соединение с базой данных
 * @return {Sequelize}
 */
export function getConnection() {
  if (connection === undefined) {
    connection = new Sequelize(dbConfig.dbname, dbConfig.username, dbConfig.password, {
      dialect: dbConfig.dialect,
      host: dbConfig.host,
      logging: false,
      define: {
        timestamps: false,
      },
    });
  }
  return connection;
}
