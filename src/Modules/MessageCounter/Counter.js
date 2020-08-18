import {mqttClient} from '../../core/index.js';

/**
 * Счетчик сообщений
 */
export class Counter {
  /**
   * @param {String} sTopic Топик счетчика
   * @param {Integer} iInterval Интервал обновления счетчика в секундах
   */
  constructor(sTopic, iInterval) {
    this.topic = sTopic;
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
}

