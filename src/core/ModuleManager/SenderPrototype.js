import {mqttClient} from '../../core/index.js';

/**
 * Прототип для отправителей
 */
export class SenderPrototype {
  /**
   * Отправка сообщения mqtt
   * @param {mixed} sTopic
   * @param {mixed} sMessage
   */
  sendMessage(sTopic, sMessage) {
    mqttClient.sendMessage(sTopic, sMessage);
  }
}
