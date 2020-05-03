/**
 * Класс для получения конфигурационных данных для Api
 */
class ApiConfigurator {
  /**
   * Получаем порт, который слушает сервер
   * @return {int}
   */
  static getPort() {
    const iPort = ApiConfigurator.normalizePort(process.env.PORT || '4000');
    return iPort;
  }

  /**
   * @param {mixed} val
   * @return {int}
   * Нормализует порт до целого числа
   * При неудаче кидает ошибку
   */
  static normalizePort(val) {
    const port = parseInt(val, 10);
    if (!Number.isInteger(port)) {
      throw Error('Port is not valid');
    }
    return port;
  }
}

module.exports = ApiConfigurator;
