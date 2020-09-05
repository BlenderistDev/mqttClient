import {OutSensor} from './OutSensor.js';
import {InSensor} from './InSensor.js';

/**
 * Обертка для датчика движения
 */
export class MotionSensor {
  /**
   * Создаем внешний и внутренний датчики
   * @param {object} oMotionSensorRow
   * @param {string} baseTopic
   */
  constructor(oMotionSensorRow, baseTopic) {
    this.outSensor = new OutSensor(oMotionSensorRow, baseTopic);
    this.inSensor = new InSensor(oMotionSensorRow);
  }

  /**
   * Обрабатываем сообщение
   * @param {string} playload
   */
  handleMessage(playload) {
    if (playload === this.inSensor.motionMessage) {
      this.inSensor.motion = true;
      this.outSensor.setMotionDetected();
    } else if (playload === this.inSensor.noMotionMessage) {
      this.handleNoMotion();
    }
  }

  /**
   * Обрабатываем сообщение источника об отсутствии движения
   */
  handleNoMotion() {
    if (this.inSensor.motion !== false) {
      this.inSensor.motion = false;
      if (this.outSensor.sinceMotionDetected) {
        // сколько времени длится текущее движение
        let delay = new Date - this.outSensor.sinceMotionDetected;
        if (delay < this.outSensor.minDelay) {
          delay = this.outSensor.minDelay;
        }
        this.outSensor.setMotionTimeout(delay);
      }
    }
  }
}
