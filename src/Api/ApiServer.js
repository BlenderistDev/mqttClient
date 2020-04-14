const http = require('http');
const debug = require('debug')('web:server');

/**
 * Класс для Api контроллера
 */
class ApiServer {
  /**
   * Конструктор сервера
   */
  constructor() {
    this.app = require('./app');
    this.port = this.getPort();
    this.app.set('port', this.port);
    this.createServer();
  }

  /**
   * Получаем порт, который слушает сервер
   * @return {int}
   */
  getPort() {
    const iPort = this.normalizePort(process.env.PORT || '4000');
    return iPort;
  }

  /**
   * Создание сервера
   */
  createServer() {
    this.server = http.createServer(this.app);
    this.server.listen(this.port);
    this.server.on('listening', () => this.onListening());
    this.server.on('error', (error) => this.onError(error));
  }

  /**
   * @param {mixed} val
   * @return {mixed}
   * Normalize a port into a number, string, or false.
   */
  normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }

  /**
  * Event listener for HTTP server "listening" event.
  */
  onListening() {
    const addr = this.server.address();
    let bind;
    if (typeof addr === 'string') {
      bind = 'pipe ' + addr;
    } else {
      bind = 'port ' + addr.port;
    }
    debug('Listening on ' + bind);
  }

  /**
 * @param {object} error
 * Event listener for HTTP server "error" event.
 */
  onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    let bind;
    if (typeof port === 'string') {
      bind = 'Pipe ' + this.port;
    } else {
      bind = 'Port ' + this.port;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        throw Error(bind + ' requires elevated privileges');
      case 'EADDRINUSE':
        throw Error(bind + ' is already in use');
      default:
        throw error;
    }
  }
}

module.exports = new ApiServer();
