/**
 * Сингтон подключения к базе данных
 */
class DatabaseClient {
  /**
  * @return {object} database connection
  */
  static getConnection() {
    if (DatabaseClient._connection === undefined) {
      DatabaseClient._connection = require('knex')({
        client: 'mysql',
        version: '5.7',
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: 'Ha2_Pin!y<',
          database: 'mqtt',
        },
      });
    }
    return DatabaseClient._connection;
  }
}

module.exports = DatabaseClient.getConnection();
