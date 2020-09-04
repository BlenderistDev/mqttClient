import {ApiPrototype} from '../../core/index.js';
import {MessagesCounter} from './model/MessagesCounter.js';

/**
 * Класс Api для модуля счетчика сообщений
 */
export class Api extends ApiPrototype {
  /**
   * Получаем список счетчиков
   * @return {promise}
   */
  cmdGetList() {
    return MessagesCounter.getTable();
  }

  /**
   * Обновляем счетчик
   * @return {promise}
   */
  cmdUpdate() {
    return MessagesCounter.getByPk(this.data.id).then((oRow) => {
      return oRow.update(this.data).then(() => {
        return oRow.dataValues;
      });
    });
  }

  /**
   * Добавляем счетчик
   * @return {promise}
   */
  cmdCreate() {
    return MessagesCounter.create(this.data);
  }

  /**
   * Удаляем счетчик
   * @return {promise}
   */
  cmdDelete() {
    return MessagesCounter.removeByPk(this.data.id);
  }
}
