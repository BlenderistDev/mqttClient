const http = require('http');
const ApiConfigurator = require('./ApiConfigurator');

/**
 * Класс для Api контроллера
 */
class ApiServer {
  /**
   * Конструктор сервера
   */
  constructor() {
    this.app = require('./app');
    this.port = ApiConfigurator.getPort();
    this.app.set('port', this.port);
    this.createServer();
  }

  /**
   * Создание сервера
   */
  createServer() {
    this.server = http.createServer(this.app);
    this.server.listen(this.port);
    this.server.on('error', (error) => this.onError(error));
  }

  /**
  * Обработчик ошибок сервера
  * @param {object} error
  */
  onError(error) {
    console.error(error);
  }
}

module.exports = new ApiServer();
