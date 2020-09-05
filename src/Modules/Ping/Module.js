import {ModulePrototype, sendDiscoveryMessage} from '../../core/index.js';

const measureSubTopic = '/measure';
const resultSubTopic = '/result';

/**
 * Класс для модуля пинга
 */
export class Module extends ModulePrototype {
  /**
   * @param {string} moduleTopic
   * Конструктор модуля пинга
   */
  constructor(moduleTopic) {
    super(moduleTopic);
    this.homeAssistantDiscover();
    this.setPingSender();
  }

  /**
   * Устанавливает отправителя для модуля
   * Интервал - секунда
   */
  setPingSender() {
    setInterval(() => {
      this.sendPingData();
    }, 1000);
  }

  /**
   * Отправляет mqtt сообщение для пинга
   * В топик для замера
   */
  sendPingData() {
    const oPing = {
      timestamp: Date.now(),
    };
    this.sendMessage(JSON.stringify(oPing), this.getMeasureTopic());
  }

  /**
   * Считаем разницу между отправкой и получением
   * И переводим в секунды
   * Результат отправляем в топик для реузльтатов
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    const oMessage = JSON.parse(sMessage);
    const iPing = (Date.now() - oMessage.timestamp)/1000;
    this.sendMessage(iPing.toString(), this.getResultTopic());
  }

  /**
   * Модуль подписан только на топик для замеров
   * @param {string} sTopic
   * @return {bool}
   */
  isTopicInSubscription(sTopic) {
    return sTopic === this.getMeasureTopic();
  }

  /**
   * Отправляем сообщение для обнаружения в Home Assistant
   */
  homeAssistantDiscover() {
    const oParams = {
      unit_of_measurement: 'c',
    };
    sendDiscoveryMessage('ping', this.getResultTopic(), 'sensor', oParams);
  }

  /**
   * Возвращает топик для отправки результата
   * @return {string}
   */
  getResultTopic() {
    return this.getTopic() + resultSubTopic;
  }

  /**
   * Возвращает топик для отправки данных для замера
   * @return {string}
   */
  getMeasureTopic() {
    return this.getTopic() + measureSubTopic;
  }
}

