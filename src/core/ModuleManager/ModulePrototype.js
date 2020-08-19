import {mqttClient} from '../../core/index.js';

/**
 * Прототип для модулей
 */
export class ModulePrototype {
  /**
   * Отправка сообщения mqtt
   * @param {mixed} sTopic
   * @param {mixed} sMessage
   * @param {bool} bRetain
   */
  sendMessage(sTopic, sMessage, bRetain = false) {
    mqttClient.sendMessage(sTopic, sMessage, bRetain);
  }

  /**
   * Проверяет, подписан ли подписчик на топик
   * @param {string} sTopic
   * @return {boolean}
   */
  isTopicInSubscription(sTopic) {
    return true;
  }

  /**
   * Обрабатывает сообщение
   * Метод должен быть переопределен в дочернем классе
   * @param {string} sTopic
   * @param {string} sMessage
   * @return {mixed}
   */
  handleMessage(sTopic, sMessage) {
    return null;
  }
}
