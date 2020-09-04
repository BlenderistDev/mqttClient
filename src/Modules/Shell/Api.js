import {ApiPrototype} from '../../core/index.js';
import {ShellSubscriptions} from './model/ShellSubscriptions.js';
import {ShellSenders} from './model/ShellSenders.js';

/**
 * Класс для Api модуля Shelll
 */
export class Api extends ApiPrototype {
  /**
   * Возвращает список подписок модуля
   * @return {promise}
   */
  cmdGetList() {
    return ShellSubscriptions.getTable();
  }

  /**
   * Обновляем подписку модуля
   * @return {promise}
   */
  cmdUpdate() {
    return ShellSubscriptions.getByPk(this.data.id).then((oRow) => {
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
    return ShellSubscriptions.create(this.data);
  }

  /**
   * Удаляем подписку модуля
   * @return {promise}
   */
  cmdDelete() {
    return ShellSubscriptions.removeByPk(this.data.id);
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

