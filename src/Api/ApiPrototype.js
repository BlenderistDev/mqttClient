const path = require('path');

/**
 * Прототип контроллеров Api
 */
class ApiPrototype {
  /**
   * Конструктор контроллера.
   * Устанавливает объекты request и response
   * для последущего использования в контроллерах
   * @param {object} request
   * @param {object} response
   */
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  /**
   * возвращает созданный объект модуля
   * необходим для инкапсуляции создания модулей
   * в одном месте
   * @return {object}
   * @param {string} sModuleName
   */
  getModule(sModuleName) {
    const Api = require(path.join(process.cwd(), 'modules', sModuleName, 'Api'));
    const oApi = new Api(this.request, this.response);
    return oApi;
  }

  /**
   * геттер поля data
   * возвращает поле data post запроса
   */
  get data() {
    return this.request.body.data;
  }
}

module.exports = ApiPrototype;
