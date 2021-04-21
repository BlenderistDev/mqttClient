import { mqttClient } from '../../core/MqttClient.js'
import { sendDiscoveryMessage } from '../../core/HomeAssistant.js'
import _ from 'lodash'

const config = JSON.parse(process.argv[2]);

_.map(config.config, row => {
  const name = `messages_in_${row.interval}_sec`
  const topic = `${config.topic}/${name}`
  sendDiscoveryMessage(name, topic, 'sensor', { unit_of_measurement: 'messages' })

  let count = 0
  process.on('message', message => count++)
  setInterval(() => {
    mqttClient.sendMessage(topic, count.toString())
    count = 0;
  }, row.interval * 1000)
})
