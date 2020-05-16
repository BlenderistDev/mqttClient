const path = require('path');
const fsPromises = require('fs').promises;
const ApiError = require('./ApiError');

/**
 * Класс для обработки запроса Api
 */
class RequestHandler {
  /**
   * Конструктор класса.
   * Сохраняет объект запроса в свойства объекта
   * @param {object} request
   */
  constructor(request) {
    this.request = request;
  }

  /**
  * Выполняет запрос
  * @return {Promise}
  */
  async handleRequest() {
    const oController = await this.getModuleApi();
    return this.executeCmd(oController);
  }

  /**
   * Возвращает контроллер Api модуля
   * @return {Promise}
   */
  getModuleApi() {
    const sControllerPath = path.join(process.env.MODULE_DIR, this.moduleName, 'Api.js');
    return fsPromises.access(sControllerPath).then(()=>{
      const ApiController = require(sControllerPath);
      return new ApiController(this.request);
    }).catch((error) => {
      throw new ApiError(`Undefined module ${this.moduleName}`);
    });
  }

  /**
  * Выполняет комманду
  * @param {ApiPrototype} oController
  * @param {string} sCmd
  * @return {mixed}
  */
  executeCmd(oController) {
    const sMethodName = `cmd${this.cmd}`;
    if (!(sMethodName in oController)) {
      throw new ApiError(`Command ${this.cmd} not found`);
    }
    return oController[sMethodName]();
  }

  /**
  * Возвращает запращиваемую команду
  * @return {string}
  */
  get cmd() {
    if (this.request.body.cmd == undefined) {
      throw new Error('undefined cmd');
    }
    return this.toUpperCaseFirstLetter(this.request.body.cmd);
  }

  /**
   * Возвращает имя запрашиваемого модуля
   * @return {string}
   */
  get moduleName() {
    if (this.request.body.module == undefined) {
      throw new Error('undefined module name');
    }
    return this.toUpperCaseFirstLetter(this.request.body.module);
  }

  /**
   * Переводит первую букву строки в верхний регистр
   * @param {string} sStr
   * @return {string}
   */
  toUpperCaseFirstLetter(sStr) {
    return sStr[0].toUpperCase() + sStr.substr(1);
  }
}

module.exports = RequestHandler;
