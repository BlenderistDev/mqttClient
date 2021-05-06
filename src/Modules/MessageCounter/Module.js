import { sendDiscoveryMessage } from '../../core/HomeAssistant.js'
import _ from 'lodash'
import { mqttClient, moduleClient } from '../../core/SocketClient.js'

const config = JSON.parse(process.argv[2])

_.map(config.config, row => {
  const name = `messages_in_${row.interval}_sec`
  const topic = `${config.topic}/${name}`
  sendDiscoveryMessage(name, topic, 'sensor', { unit_of_measurement: 'messages' })
  let count = 0
  mqttClient.on('message', message => count++)
  setInterval(() => {
    mqttClient.send(topic, count.toString())
    moduleClient.send({
      id: row.id,
      message: count.toString()
    })
    count = 0;
  }, row.interval * 1000)
})
