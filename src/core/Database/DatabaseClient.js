const Sequelize = require('sequelize');
const path = require('path');

/**
 * Синглтон подключения к базе данных
 */
class DatabaseConnection {
  /**
  * @return {object} database connection
  */
  static getConnection() {
    if (DatabaseConnection._connection === undefined) {
      const dbConfig = require(path.join(process.env.CONFIG_DIR, 'dbConfig.json'));
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
