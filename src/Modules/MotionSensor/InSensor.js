/**
 * Класс для датчика движения
 * которы подается на вход модулю
 */
export class InSensor {
  /**
  * Устанавливаем начальные параметри входящего датчика
  * @param {MotionSensors} oMotionSensorRow
  */
  constructor(oMotionSensorRow) {
    this.motion = null;
    this.motionMessage = oMotionSensorRow.in_motion_message;
    this.noMotionMessage = oMotionSensorRow.in_no_motion_message;
    this.topic = oMotionSensorRow.in_topic;
  }
}
