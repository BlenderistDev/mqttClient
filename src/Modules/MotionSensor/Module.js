import { MotionSensor } from './MotionSensor.js'
import { mqttClient } from '../../Components/SocketClient.js'
import { config, topic } from "../../Components/ModuleConfig.js"

const sensor = new MotionSensor(config, topic)

mqttClient.on('message', (mqttMessage) => {
  if (mqttMessage.topic === sensor.inSensor.topic) {
    sensor.handleMessage(mqttMessage.message)
  }
})
