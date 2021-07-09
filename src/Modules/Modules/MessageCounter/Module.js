import { sendDiscoveryMessage } from '../../../Components/HomeAssistant.js'
import { mqttClient, moduleClient } from '../../../Components/SocketClient.js'
import { config, topic } from "../../../Components/ModuleConfig.js";

const name = `messages_in_${config.interval}_sec`
const moduleTopic = `${topic}/${name}`

sendDiscoveryMessage(name, moduleTopic, 'sensor', { unit_of_measurement: 'messages' })

let count = 0
mqttClient.on('message', () => count++)

setInterval(() => {
  mqttClient.send(moduleTopic, count.toString())
  moduleClient.send({
    id: config.id,
    message: count.toString()
  })
  count = 0;
}, config.interval * 1000)
