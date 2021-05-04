import _ from 'lodash';
import {MotionSensor} from './MotionSensor.js';
import { getMqttClient } from '../../core/SocketClient.js'

const mqttClient = getMqttClient()

const config = JSON.parse(process.argv[2])

const motionSensors = _.map(config.config, sensor => new MotionSensor(sensor, config.topic))

mqttClient.on('message', (mqttMessage) => {
  motionSensors.forEach((sensor) => {
    if (mqttMessage.topic === sensor.inSensor.topic) {
      sensor.handleMessage(mqttMessage.message)
    }
  })
})
