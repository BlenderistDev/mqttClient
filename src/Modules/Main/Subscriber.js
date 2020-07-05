const mqttClient = require('../../core/index').mqtt;
const Subscriptions = require('./model/Subscriptions');

/**
 * Класс для управления подписчиками
 */
class Subscriber {
  /**
   * Конструктор управления подписчиками
   */
  constructor() {
    this.setSubscribes();
  }

  /**
   * Подписываемся на все топики
   */
  async setSubscribes() {
    mqttClient.on('connect', () => {
      mqttClient.subscribe('#');
    });
    this.aSubscriptions = await Subscriptions.getTable();
    this.setHandler();
  }

  /**
   * Обработчик события входящего сообщения
   */
  setHandler() {
    mqttClient.on('message', (topic, message) => {
      this.aSubscriptions.forEach((oSubscription) => {
          if (oSubscription.topic === topic || oSubscription.topic == '#') {
            require(`../${oSubscription.module}/Subscriber.js`).handleMessage(topic.toString(), message.toString());
          }
      });
    });
  }
}

module.exports = new Subscriber();

