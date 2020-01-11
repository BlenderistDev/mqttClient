const path = require('path');
const mqttClient = require(path.join(process.env.SOURCE_DIR, 'Mqtt', 'MqttClient'));
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
      Subscriptions.getByTopic(topic).then((res) => {
        res.forEach((oRow) => {
          require(`../${oRow.module}/Subscriber.js`).handleMessage(topic.toString(), message.toString());
        });
      });
    });
  }
}

module.exports = new Subscriber();

