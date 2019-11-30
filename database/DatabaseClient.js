const Sequelize = require('sequelize');

/**
 * Синглтон подключения к базе данных
 */
class DatabaseConnection {
  /**
  * @return {object} database connection
  */
  static getConnection() {
    if (DatabaseConnection._connection === undefined) {
      DatabaseConnection._connection = new Sequelize('mqtt', 'root', 'Ha2_Pin!y<', {
        dialect: 'mysql',
        host: '127.0.0.1',
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
