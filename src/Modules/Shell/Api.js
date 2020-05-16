const ApiPrototype = require('../../core/index').ApiPrototype;
const ShellSubscribers = require('./model/ShellSubscriptions');
const ShellSenders = require('./model/ShellSenders');

/**
 * Класс для Api модуля Shelll
 */
class Api extends ApiPrototype {
  /**
   * Возвращает список подписок модуля
   * @return {promise}
   */
  cmdGetList() {
    return ShellSubscribers.getTable();
  }

  /**
   * Обновляем подписку модуля
   * @return {promise}
   */
  cmdUpdate() {
    return ShellSubscribers.getByPk(this.data.id).then((oRow) => {
      return oRow.update(this.data).then(() => {
        return oRow.dataValues;
      });
    });
  }

  /**
  * Создаем подписку модуля
  * @return {promise}
  */
  cmdCreate() {
    return ShellSubscribers.create(this.data);
  }

  /**
   * Удаляем подписку модуля
   * @return {promise}
   */
  cmdDelete() {
    return ShellSubscribers.removeByPk(this.data.id);
  }

  /**
   * Создаем отправителя модуля
   * @return {promise}
   */
  cmdCreateSender() {
    return ShellSenders.create(this.data);
  }

  /**
   * Удаляем отправителя модуля
   * @return {promise}
   */
  cmdDeleteSender() {
    return ShellSenders.removeByPk(this.data.id);
  }

  /**
  * Получаем список отправителей модуля
  * @return {promise}
  */
  cmdGetSenderList() {
    return ShellSenders.getTable();
  }

  /**
   * Обновляем отправителя модуля
   * @return {promise}
   */
  cmdUpdateSender() {
    return ShellSenders.getByPk(this.data.id).then((oRow) => {
      return oRow.update(this.data).then(() => {
        return oRow.dataValues;
      });
    });
  }
}

module.exports = Api;
