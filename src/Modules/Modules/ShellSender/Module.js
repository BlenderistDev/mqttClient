import { sendDiscoveryMessage } from '../../../Components/HomeAssistant.js'
import { mqttClient } from '../../../Components/SocketClient.js'
import { config, topic } from "../../../Components/ModuleConfig.js"
import { execIfNotRoot, shellExec } from '../../../Components/Shell.js'

execIfNotRoot(() => {
  const moduleTopic = `${topic}/${config.topic}`
  sendDiscoveryMessage(config.name, moduleTopic, 'sensor', {})
  setInterval(() => mqttClient.send(moduleTopic, shellExec(config.command)), config.interval * 1000)
})
