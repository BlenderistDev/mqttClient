const path = require('path');
const ApiPrototype = require(path.join(process.env.API_DIR, 'ApiPrototype'));
const MessagesCounter = require('./model/MessagesCounter');

/**
 * Класс Api для модуля счетчика сообщений
 */
class Api extends ApiPrototype {
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

module.exports = Api;
