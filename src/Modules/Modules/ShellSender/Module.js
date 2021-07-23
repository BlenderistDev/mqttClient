import { sendDiscoveryMessage } from '../../../Components/HomeAssistant.js'
import md5 from 'md5'
import { mqttClient } from '../../../Components/SocketClient.js'
import { config, topic } from "../../../Components/ModuleConfig.js"
import { execIfNotRoot, shellExec } from '../../../Components/Shell.js'

execIfNotRoot(() => {
  const moduleTopic = `${topic}/${config.topic}`
  sendDiscoveryMessage(md5(moduleTopic), moduleTopic, 'sensor', {})
  setInterval(() => mqttClient.send(moduleTopic, shellExec(config.command)), config.interval * 1000)
})
