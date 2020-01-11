const mqtt = require('mqtt');
const path = require('path');
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
      const mqttConfig = require(path.join(process.env.CONFIG_DIR, 'mqttConfig.json'));
      MqttClient._connection = mqtt.connect(mqttConfig.host, {
        username: mqttConfig.username,
        password: mqttConfig.password,
      });
    }
    return MqttClient._connection;
  }
}

module.exports = MqttClient.getConnection();
