import { mqttClient} from '../../core/index.js';

/**
 * Прототип для модулей
 */
export class ModulePrototype {
  /**
   * Сохраняем топик модуля
   * @param {string} moduleTopic
   */
  constructor(moduleTopic, config) {
    this.setTopic(moduleTopic);
    this.config = config;
  }

  /**
   * Отправка сообщения mqtt
   * @param {mixed} sMessage
   * @param {mixed} sTopic
   * @param {bool} bRetain
   */
  sendMessage(sMessage, sTopic = '', bRetain = false) {
    if (sTopic === '') {
      sTopic = this.getTopic();
    }
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

  /**
   * Устанавливаем топик модуля
   * @param {string} sTopic
   */
  setTopic(sTopic) {
    this.topic = sTopic;
  }

  /**
   * Возвращает топик модуля
   * @return {string}
   */
  getTopic() {
    return this.topic;
  }
}
