import {ClickWatcher} from './Click.js'
import { mqttClient } from '../../../Components/SocketClient.js'
import { config, topic } from "../../../Components/ModuleConfig.js";

const clickWatcher = new ClickWatcher(config, topic + '/' + config.name)

mqttClient.on('message', (mqttMessage) => {
  if (clickWatcher.getInTopic() === mqttMessage.topic) {
    clickWatcher.handleClick(JSON.parse(mqttMessage.message))
  }
})
