import {mqttClient} from '../../core/index.js';

/**
 * Прототип для отправителей
 */
export class SenderPrototype {
  /**
   * Отправка сообщения mqtt
   * @param {mixed} sTopic
   * @param {mixed} sMessage
   * @param {bool} bRetain
   */
  sendMessage(sTopic, sMessage, bRetain = false) {
    mqttClient.sendMessage(sTopic, sMessage, bRetain);
  }
}
