const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig.json');

/**
 * Синглтон подключения к базе данных
 */
class DatabaseConnection {
  /**
  * @return {object} database connection
  */
  static getConnection() {
    if (DatabaseConnection._connection === undefined) {
      DatabaseConnection._connection = new Sequelize(dbConfig.dbname, dbConfig.username, dbConfig.password, {
        dialect: dbConfig.dialect,
        host: dbConfig.host,
        logging: false,
        define: {
          timestamps: false,
        },
      });
    }
    return DatabaseConnection._connection;
  }
}

module.exports = DatabaseConnection.getConnection();
