const mqttClient = require('../mqtt/MqttClient');
const Subscriptions = require('./model/Subscriptions');
const MqttLogger = require('../modules/mqttLogger/MqttLogger');
const MessageCounter = require('../modules/messageCounter/Subscriber');

/**
 * Класс для управления подписчиками
 */
class Subscriber {
  /**
   * Конструктор управления подписчиками
   */
  constructor() {
    this.setSubscribes();
    this.setHandler();
  }

  /**
   * Подписываемся на все топики
   */
  setSubscribes() {
    mqttClient.on('connect', () => {
      mqttClient.subscribe('#');
    });
  }

  /**
   * Обработчик события входящего сообщения
   */
  setHandler() {
    mqttClient.on('message', (topic, message) => {
      MqttLogger.logMessage(topic, message.toString());
      MessageCounter.handleMessage();
      Subscriptions.getByTopic(topic).then((res) => {
        res.forEach((oRow) => {
          require(`../modules/${oRow.module}/Subscriber.js`).handleMessage(JSON.parse(message.toString()));
        });
      });
    });
  }
}

module.exports = Subscriber;

