import shell from 'shelljs'
import { sendDiscoveryMessage } from '../../../Components/HomeAssistant.js'
import md5 from 'md5'
import { mqttClient } from '../../../Components/SocketClient.js'
import { config, topic } from "../../../Components/ModuleConfig.js"

const moduleTopic = `${topic}/${config.topic}`
sendDiscoveryMessage(md5(moduleTopic), moduleTopic, 'sensor', {})

setInterval(() => mqttClient.send(moduleTopic, shell.exec(config.command, {'silent': true}).toString()), config.interval)
