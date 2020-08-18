import {mqttClient} from '../../core/index.js';

/**
 * Прототип для подписчиков
 */
export class SubscriberPrototype {
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
   */
  handleMessage(sTopic, sMessage) {
    throw new Error('Message handle is not defined');
  }

  /**
   * Отправка сообщения mqtt
   * @param {mixed} sTopic
   * @param {mixed} sMessage
   */
  sendMessage(sTopic, sMessage) {
    mqttClient.sendMessage(sTopic, sMessage);
  }
}
