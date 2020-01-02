const mqtt = require('mqtt');
const mqttConfig = require('../config/mqttConfig.json');

/**
 * Клиент для mqtt
 */
class MqttClient {
  /**
   * Возвращает подключение к mqtt
   * @return {object}
   */
  static getConnection() {
    if (MqttClient._connection === undefined) {
      MqttClient._connection = mqtt.connect(mqttConfig.host, {
        username: mqttConfig.username,
        password: mqttConfig.password,
      });
    }
    return MqttClient._connection;
  }
}

module.exports = MqttClient.getConnection();
