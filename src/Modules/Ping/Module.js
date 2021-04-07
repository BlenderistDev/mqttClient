import {sendDiscoveryMessage} from '../../core/HomeAssistant/HomeAssistant.js';
import {mqttClient} from "../../core/Mqtt/MqttClient.js";

/**
 * Возвращает топик для отправки данных для замера
 * @return {string}
 */
function getMeasureTopic() {
  return this.getTopic() + measureSubTopic;
}

const measureSubTopic = '/measure';
const resultSubTopic = '/result';
console.log(JSON.parse(process.argv[2]));
process.on('message', (m) => {
  console.log(m);
});
// mqttClient.on('message', (topic, message) => {
//   _.chain(modules)
//   .filter(module => module.isTopicInSubscription(topic.toString()))
//   .map(module => module.handleMessage(topic, message))
//   .value()
// });

/**
 * Отправляем сообщение для обнаружения в Home Assistant
 */
function homeAssistantDiscover() {
  const oParams = {
    unit_of_measurement: 'c',
  };
  sendDiscoveryMessage('ping', this.getResultTopic(), 'sensor', oParams);
}

/**
 * Устанавливает отправителя для модуля
 * Интервал - секунда
 */
function setPingSender() {
  setInterval(() => {
    this.sendPingData();
  }, 1000);
}

/**
 * Отправляет mqtt сообщение для пинга
 * В топик для замера
 */
function sendPingData() {
  const oPing = {
    timestamp: Date.now(),
  };
  this.sendMessage(JSON.stringify(oPing), this.getMeasureTopic());
}

mqttClient.on('message', (topic, message) => {
  if (topic === getMeasureTopic()) {

  }
});

/**
 * Класс для модуля пинга
 */
export class Module {
  /**
   * @param {string} moduleTopic
   * Конструктор модуля пинга
   */
  constructor(moduleTopic) {
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

