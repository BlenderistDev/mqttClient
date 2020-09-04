import http from 'http';
import {ApiConfigurator} from './ApiConfigurator.js';
import {app} from './app.js';

/**
 * Класс для Api контроллера
 */
export class ApiServer {
  /**
   * Конструктор сервера
   */
  constructor() {
    this.app = app;
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
