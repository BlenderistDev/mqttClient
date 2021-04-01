import _ from 'lodash';
import {ModulePrototype} from '../../core/index.js';
import {MotionSensor} from './MotionSensor.js';

/**
 * Класс для модуля датчика движения
 */
export class Module extends ModulePrototype {
  /**
   * @param {string} moduleTopic
   * Конструктор модуля датчика движения
   */
  constructor(moduleTopic, config) {
    super(moduleTopic, config);
    this.motionSensors = [];
    this.topicList = [];
    this.setMotionSensors();
  }

  /**
   * Инициализируем датчики
   */
  async setMotionSensors() {
    _.map(this.config, sensor => {
      this.motionSensors.push(new MotionSensor(sensor, this.getTopic()));
      this.topicList.push(sensor.in_topic);
    })
  }


  /**
   * Передаем значение нужному датчику
   * @param {string} sTopic
   * @param {string} sMessage
   */
  handleMessage(sTopic, sMessage) {
    this.motionSensors.forEach((sensor) => {
      if (sTopic === sensor.inSensor.topic) {
        sensor.handleMessage(sMessage);
      }
    });
  }

  /**
   * Модуль подписан на входящие топики датчиков
   * @param {string} sTopic
   * @return {bool}
   */
  isTopicInSubscription(sTopic) {
    return (this.topicList.indexOf(sTopic) >= 0);
  }
}
