const mqtt = require('mqtt');

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
      MqttClient._connection = mqtt.connect('mqtt://192.168.1.101', {
        username: 'blenderist',
        password: 'Ha2_Pin!y<',
      });
    }
    return MqttClient._connection;
  }
}

module.exports = MqttClient.getConnection();
