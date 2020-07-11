const MqttClient = require('../../core/index').mqtt;

/**
 * mqtt Подписчик для замера пинга
 */
class PingSubscriber {
  /**
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    const oMessage = JSON.parse(sMessage);
    const iPing = (Date.now() - JSON.parse(sMessage).timestamp)/1000;
    MqttClient.publish(oMessage.result_topic, iPing.toString());
  }
}

module.exports = new PingSubscriber();
