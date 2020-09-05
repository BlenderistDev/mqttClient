import {mqttClient, sendDiscoveryMessage} from '../../core/index.js';
// eslint-disable-next-line no-unused-vars
import {MotionSensors} from './model/MotionSensors.js';

/**
 * Исходящий сенсор движения
 * (после обработки модулем)
 */
export class OutSensor {
  /**
  * Устанавливаем параметры датчика
  * @param {MotionSensors} oMotionSensorRow
  * @param {string} baseTopic
  */
  constructor(oMotionSensorRow, baseTopic) {
    this.motion = null;
    this.noMotionTimerId = null;
    this.name = oMotionSensorRow.name + '_motion';
    this.topic = `${baseTopic}/${oMotionSensorRow.name}`;
    this.motionMessage = oMotionSensorRow.out_motion_message;
    this.noMotionMessage = oMotionSensorRow.out_no_motion_message;
    this.sinceMotionDetected = null;
    this.minDelay = oMotionSensorRow.min_delay;
    this.homeAssistantDiscover();
  }

  /**
  * Устанавливаем таймаут подачи сигнала отсутствия движения
  * @param {integer} delay
  */
  setMotionTimeout(delay) {
    this.cancelNoMotionTimeout();
    console.log(delay);
    this.noMotionTimerId = setTimeout(() => {
      this.setNoMotion();
      this.noMotionTimerId = null;
    }, delay);
  }

  /**
  * Отменяем таймаут до состояния отсутствия движения
  */
  cancelNoMotionTimeout() {
    if (this.noMotionTimerId) {
      clearTimeout(this.noMotionTimerId);
      this.noMotionTimerId = null;
    }
  }

  /**
  * Движение обнаружено
  */
  setMotionDetected() {
    this.cancelNoMotionTimeout();
    if (this.motion !== true) {
      this.motion = true;
      this.sinceMotionDetected = new Date;
      console.log('motion');
      mqttClient.sendMessage(this.topic, this.motionMessage);
    }
  }


  /**
  * Движения не обнаружено
  */
  setNoMotion() {
    if (this.motion !== false) {
      this.motion = false;
      console.log('no_motion');
      mqttClient.sendMessage(this.topic, this.noMotionMessage);
    }
  }

  /**
  * Отправляем сообщение для обнаружения в Home Assistant
  * Уникальное имя образуется за счет md5 хэша от топика с результатом
  */
  homeAssistantDiscover() {
    const oParams = {
      payload_on: 1,
      payload_off: 0,
      device_class: 'motion',
    };
    sendDiscoveryMessage(this.name, this.topic, 'binary_sensor', oParams);
  }
}
