import _ from 'lodash';
import {sendDiscoveryMessage} from '../../../Components/HomeAssistant.js';
import { mqttClient } from '../../../Components/SocketClient.js'

const singleClickType = 'single';
const doubleClickType = 'double';

const payloadOn = 1;
const payloadOff = 0;

/**
 * Класс отвечает за выбор типа клика:
 * одиночный или двойной
 * и производит отправку клика
 */
export class ClickWatcher {
  /**
   * Создаем объекты одиночного и двойного клика
   * @param {string} rootTopic
   */
  constructor(doubleClick, rootTopic) {
    this.singleClick = new Click(rootTopic + '/' + singleClickType, doubleClick.name + '_' + singleClickType);
    this.doubleClick = new Click(rootTopic + '/' + doubleClickType, doubleClick.name + '_' + doubleClickType);
    this.inTopic = doubleClick.in_topic;
    this.interval = doubleClick.interval;
    this.attribute = doubleClick.attribute;
    this.timerId = 0;
  }

  /**
   * Возвращает топик входящих кликов
   * @return {string}
   */
  getInTopic() {
    return this.inTopic;
  }

  /**
   * Обрабатывает сообщение о клике
   * @param {object} oMessage
   */
  handleClick(oMessage) {
    let state;
    if (this.attribute) {
      state = _.get(oMessage, this.attribute)
    } else {
      state = oMessage
    }
    if (this.currentState !== state) {
      if (this.timerId) {
        this.handleSecondClick();
      } else {
        this.handleFirstClick();
      }
    }
    this.currentState = state;
  }

  /**
   * Обработка двойного клика
   */
  handleSecondClick() {
    this.doubleClick.sendClickMessage();
    clearTimeout(this.timerId);
    this.timerId = 0;
  }

  /**
   * Обработка первого клика
   */
  handleFirstClick() {
    this.timerId = setTimeout(() => {
      this.singleClick.sendClickMessage();
      this.timerId = 0;
    }, this.interval);
  }
}

/**
 * Класс для отправки информации о клике
 */
class Click {
  /**
   * @param {string} topic
   * @param {string} name
   */
  constructor(topic, name) {
    this.topic = topic;
    this.name = name;
    this.homeAssistantDiscovery();
  }

  /**
   * Отправляем сообщение о клике
   */
  sendClickMessage() {
    mqttClient.send(this.topic, "1");
    setTimeout(() => {
      mqttClient.send(this.topic, "0");
    }, 600);
  }

  /**
   * Отправляем сообщение для обнаружения в Home Assistant
   */
  homeAssistantDiscovery() {
    const aParams = {
      payload_on: payloadOn,
      payload_off: payloadOff,
    };
    sendDiscoveryMessage(this.name, this.topic, 'binary_sensor', aParams);
  }
}
