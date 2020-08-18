import {MqttMessages} from './model/mqttMessages.js';
import {SubscriberPrototype} from '../../core/ModuleManager/SubscriberPrototype.js';

/**
 * Логгер всех mqtt сообщений
 */
export class Subscriber extends SubscriberPrototype {
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
