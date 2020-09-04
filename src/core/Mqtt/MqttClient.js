import mqtt from 'mqtt';
import EventEmitter from 'events';
import {mqtt as mqttConfig} from '../../../config/config.js';

export const mqttPrefix = mqttConfig.topic;

/**
 * Клиент для mqtt
 */
class MqttClient extends EventEmitter {
  /**
   * Конструктор
   * Устанавливаем соединение
   */
  constructor() {
    super();
    this.setConnection();
  }

  /**
   * Установка соеденения с mqtt
   */
  async setConnection() {
    this._connection = mqtt.connect(mqttConfig.host, {
      username: mqttConfig.username,
      password: mqttConfig.password,
    });
    this._connection.on('connect', () => {
      this._connection.subscribe('#');
    });
    this._connection.on('message', (topic, message) => {
      this.emit('message', topic.toString(), message.toString());
    });
  }

  /**
   * Отправляет mqtt сообщение
   * @param {mixed} sTopic
   * @param {mixed} sMessage
   * @param {bool} bRetain
   */
  sendMessage(sTopic, sMessage, bRetain = false) {
    this._connection.publish(sTopic.toString(), sMessage.toString(), {retain: bRetain});
  }
}

export const mqttClient = new MqttClient();

