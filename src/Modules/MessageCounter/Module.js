import { sendDiscoveryMessage } from '../../core/HomeAssistant.js'
import _ from 'lodash'
import { mqttClient, moduleClient } from '../../core/SocketClient.js'
import { config, topic } from "../../Components/ModuleConfig.js";

_.map(config, row => {
  const name = `messages_in_${row.interval}_sec`
  const moduleTopic = `${topic}/${name}`
  sendDiscoveryMessage(name, moduleTopic, 'sensor', { unit_of_measurement: 'messages' })
  let count = 0
  mqttClient.on('message', message => count++)
  setInterval(() => {
    mqttClient.send(moduleTopic, count.toString())
    moduleClient.send({
      id: row.id,
      message: count.toString()
    })
    count = 0;
  }, row.interval * 1000)
})
