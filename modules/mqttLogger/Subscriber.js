const MqttMessages = require('./model/mqttMessages');

/**
 * Логгер всех mqtt сообщений
 */
class Subscriber {
  /**
   * Запись mqtt сообщения в лог
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    MqttMessages.create({
      topic: sTopic,
      message: sMessage,
      time: Date.now(),
    });
  }
}

module.exports = new Subscriber();
