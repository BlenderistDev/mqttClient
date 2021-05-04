import { sendDiscoveryMessage } from '../../core/HomeAssistant.js'
import _ from 'lodash'
import { getMqttClient } from '../../core/SocketClient.js'

const config = JSON.parse(process.argv[2])
const mqttClient = getMqttClient()

_.map(config.config, row => {
  const name = `messages_in_${row.interval}_sec`
  const topic = `${config.topic}/${name}`
  sendDiscoveryMessage(name, topic, 'sensor', { unit_of_measurement: 'messages' })
  let count = 0
  mqttClient.on('message', message => count++)
  setInterval(() => {
    mqttClient.sendMessage(topic, count.toString())
    process.send({
      topic: 'MessageCounter',
      message: {
        id: row.id,
        message: count.toString()
      }
    })
    count = 0;
  }, row.interval * 1000)
})
