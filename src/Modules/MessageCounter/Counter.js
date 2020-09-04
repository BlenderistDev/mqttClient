import {mqttClient} from '../../core/index.js';
import md5 from 'md5';

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
    const topicHash = md5(this.topic);
    const oHomeAssistantDiscoveryConfig = {
      name: `${topicHash}_${this.counterName}`,
      unique_id: `${topicHash}_${this.counterName}`,
      unit_of_measurement: '',
      state_topic: this.topic,
    };
    mqttClient.sendMessage(`homeassistant/sensor/${topicHash}/${this.counterName}/config`, JSON.stringify(oHomeAssistantDiscoveryConfig), true);
  }
}

