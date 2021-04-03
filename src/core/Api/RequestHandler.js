import { getModuleConfig, setModuleConfig } from './ModuleApi.js'
import { getManager } from '../../core/index.js'

/**
 * Класс для обработки запроса Api
 */
export class RequestHandler {
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
    if (this.cmd === 'index') {
      return getModuleConfig(this.moduleName)
    } else if (this.cmd === 'set') {
      return setModuleConfig(this.request.body.config)
    } else if (this.cmd === 'moduleList') {
      return getManager().aModules
    } else {
      console.error(this.cmd)
    }
  }


  /**
  * Возвращает запращиваемую команду
  * @return {string}
  */
  get cmd() {
    return this.request.body.cmd;
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

