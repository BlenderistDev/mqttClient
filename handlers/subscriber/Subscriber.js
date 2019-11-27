const mqttClient = require('../../mqtt/MqttClient');
const Subscribe = require('./model/Subscribe');

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
   * @param {object} oSubscribeData
   */
  addSubscribe(oSubscribeData) {
    const oSubscribe = new Subscribe();
    oSubscribe.setData(oSubscribeData);
    oSubscribe.save();
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
      Subscribe.find({topic: topic}).then((res) => {
        res.forEach((oRow) => {
          require(`./subscribers/${oRow.module}.js`).handleMessage(JSON.parse(message.toString()));
        });
      });
    });
  }
}

module.exports = Subscriber;

