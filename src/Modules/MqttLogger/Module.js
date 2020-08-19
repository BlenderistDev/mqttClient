import {MqttMessages} from './model/mqttMessages.js';
import {ModulePrototype} from '../../core/index.js';

/**
 * Логгер всех mqtt сообщений
 */
export class Module extends ModulePrototype {
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
