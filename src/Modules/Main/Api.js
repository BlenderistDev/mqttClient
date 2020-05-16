const ApiPrototype = require('../../core/index').ApiPrototype;
const Subscriptions = require('./model/Subscriptions');

/**
 * Api для главного модуля
 */
class Api extends ApiPrototype {
  /**
   * Добавляем подписчика
   * @return {Promise}
   */
  cmdCreateSubscriber() {
    return Subscriptions.create(this.data);
  }

  /**
   * Удаляем подписчика
   * @return {promise}
   */
  cmdDeleteSubscriber() {
    return Subscriptions.removeByPk(this.data.id);
  }

  /**
   * Обновляем подписчика
   * @return {promise}
   */
  cmdUpdateSubscriber() {
    return Subscriptions.getByPk(this.data.id).then((oRow) => {
      return oRow.update(this.data).then(() => {
        return oRow.dataValues;
      });
    });
  }

  /**
   * Получаем списко подписок модуля на топики
   * @return {promise}
   */
  cmdGetModuleSubscriptions() {
    return Subscriptions.getByModule(this.data.module).then((res) => {
      return res;
    });
  }
}

module.exports = Api;
