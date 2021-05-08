import _ from 'lodash';
import {MotionSensor} from './MotionSensor.js';
import { mqttClient } from '../../Components/SocketClient.js'
import { config, topic } from "../../Components/ModuleConfig.js";

const motionSensors = _.map(config, sensor => new MotionSensor(sensor, topic))

mqttClient.on('message', (mqttMessage) => {
  motionSensors.forEach((sensor) => {
    if (mqttMessage.topic === sensor.inSensor.topic) {
      sensor.handleMessage(mqttMessage.message)
    }
  })
})
