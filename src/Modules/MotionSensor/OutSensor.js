import {mqttClient} from '../../core/MqttClient.js'
import {sendDiscoveryMessage} from '../../core/HomeAssistant.js'

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
    this.maxDelay = oMotionSensorRow.max_delay;
    this.homeAssistantDiscover();
  }

  /**
  * Устанавливаем таймаут подачи сигнала отсутствия движения
  * @param {integer} delay
  */
  setMotionTimeout(delay) {
    this.cancelNoMotionTimeout();
    this.noMotionTimerId = setTimeout(() => {
      this.setNoMotion();
      this.noMotionTimerId = null;
    }, this.getCorrectDelay(delay));
  }

  /**
   * Гарантирует, что задержка не будет меньше минимальной
   * и больше максимальной из конфига
   * @param {integer} delay
   * @return {integer}
   */
  getCorrectDelay(delay) {
    if (delay < this.minDelay) {
      delay = this.minDelay;
    } else if (delay > this.maxDelay) {
      delay = this.maxDelay;
    }
    return delay;
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
      mqttClient.sendMessage(this.topic, this.motionMessage);
    }
  }


  /**
  * Движения не обнаружено
  */
  setNoMotion() {
    if (this.motion !== false) {
      this.motion = false;
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
