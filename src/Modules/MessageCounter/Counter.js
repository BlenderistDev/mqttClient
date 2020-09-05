import {mqttClient, sendDiscoveryMessage} from '../../core/index.js';

/**
 * Счетчик сообщений
 */
export class Counter {
  /**
   * @param {String} sTopic Топик счетчика
   * @param {Integer} iInterval Интервал обновления счетчика в секундах
   * @param {string} counterName
   */
  constructor(sTopic, iInterval, counterName) {
    this.topic = sTopic;
    this.counterName = counterName;
    this.homeAssistantDiscover();
    this.messageCount = 0;
    setInterval(() => {
      this.zeroingCounter();
    }, iInterval*1000);
  }

  /**
   * Обнуление счетчика
   */
  zeroingCounter() {
    mqttClient.sendMessage(this.topic, this.messageCount.toString());
    this.messageCount = 0;
  }

  /**
   * Увеличивает счетчик сообщений
   */
  increase() {
    this.messageCount++;
  }

  /**
   * Отправляем сообщение для обнаружения в Home Assistant
   * Уникальное имя образуется за счет md5 хэша от топика с результатом
   */
  homeAssistantDiscover() {
    const oParams = {
      unit_of_measurement: '',
    };
    sendDiscoveryMessage(this.counterName, this.topic, 'sensor', oParams);
  }
}

