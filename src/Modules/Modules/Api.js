const path = require('path');
const ApiPrototype = require(path.join(process.env.API_DIR, 'ApiPrototype'));
const fsPromises = require('fs').promises;
/**
 * Api для подписчиков
 */
class Api extends ApiPrototype {
  /**
   * Список модулей, поддерживающих Api
   */
  async cmdApiModuleList() {
    return this.getFiltredModuleList(this.isModuleApiControllerExist);
  }

  /**
   * Список модулей, поддерживающих подписки
   */
  async cmdSubscriberModuleList() {
    return this.getFiltredModuleList(this.isModuleSubscriberControllerExist);
  }

  /**
   * Список модулей, поддерживающих отправки
   */
  async cmdSenderModuleList() {
    return this.getFiltredModuleList(this.isModuleSenderControllerExist);
  }
  /**
   * Возвращает список модулей, соответствующих условию
   * содержащемуся в переданной функции
   * @param {Function} fFilterFunction
   */
  async getFiltredModuleList(fFilterFunction) {
    const aFiltredModuleList = [];
    const aModuleList = await this.getModuleList();
    return new Promise(async (resolve) => {
      for (let i = 0; i < aModuleList.length; i++) {
        if (await fFilterFunction(aModuleList[i])) {
          aFiltredModuleList.push(aModuleList[i]);
        }
      }
      resolve(aFiltredModuleList);
    });
  }

  /**
   * Возвращает список модулей
   * @return {promise}
   */
  getModuleList() {
    return fsPromises.readdir(process.env.MODULE_DIR);
  }


  /**
   * Есть ли контроллер для Api у модуля
   * @param {string} sModuleName
   * @return {Promise}
   */
  isModuleApiControllerExist(sModuleName) {
    return fsPromises.access(path.join(process.env.MODULE_DIR, sModuleName, 'Api.js')).then(()=>{
      return true;
    }).catch(() => {
      return false;
    });
  }

  /**
   * Есть ли контроллер для подписок у модуля
   * @param {string} sModuleName
   * @return {Promise}
   */
  isModuleSubscriberControllerExist(sModuleName) {
    return fsPromises.access(path.join(process.env.MODULE_DIR, sModuleName, 'Subscriber.js')).then(()=>{
      return true;
    }).catch(() => {
      return false;
    });
  }

  /**
   * Есть ли контроллер для отправок у модуля
   * @param {string} sModuleName
   * @return {Promise}
   */
  isModuleSenderControllerExist(sModuleName) {
    return fsPromises.access(path.join(process.env.MODULE_DIR, sModuleName, 'Sender.js')).then(()=>{
      return true;
    }).catch(() => {
      return false;
    });
  }
}

module.exports = Api;
