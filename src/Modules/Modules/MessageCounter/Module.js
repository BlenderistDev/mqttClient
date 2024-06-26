import { sendDiscoveryMessage } from '../../../Components/HomeAssistant.js'
import { mqttClient, moduleClient, connectClient } from '../../../Components/SocketClient.js'
import { config, topic } from "../../../Components/ModuleConfig.js";
import match from "mqtt-match";

const smartIgnoreTimeout = 2000;
const smartMode = 'smart';
const ignoreRetainMode = 'true';

let ignoreRetainSuffix = ''
if (config.ignoreRetain === ignoreRetainMode) {
  ignoreRetainSuffix = '_ignore_retain'
} else if (config.ignoreRetain === smartMode) {
  ignoreRetainSuffix = '_ignore_retain_smart'
}

if (config.topic === undefined) {
  config.topic = ''
}

const name = `messages_in_${config.topic.trim() !== '' ? config.topic + '_' : '' }${config.interval}_sec${ignoreRetainSuffix}`
    .replace('#', '_').replace('+', '_').replace('/', '_')

const moduleTopic = `${topic}/${name}`

sendDiscoveryMessage(name, moduleTopic, 'sensor', { unit_of_measurement: 'messages' })

let count = 0
let smartRetainIgnore = false

connectClient.on('message', () => {
  smartRetainIgnore = true
  setTimeout(() => {
    smartRetainIgnore = false
  }, smartIgnoreTimeout)
})

mqttClient.on('message', (m) => {
  const isSmartSkipRetain = config.ignoreRetain === smartMode && smartRetainIgnore
  const isSkipRetain = config.ignoreRetain === ignoreRetainMode || isSmartSkipRetain

  if(m.retain && isSkipRetain) {
    return
  }

  if (config.topic.trim() !== '' && !match(config.topic, m.topic)) {
    return
  }

  count++
})

setInterval(() => {
  mqttClient.send(moduleTopic, count.toString())
  moduleClient.send({
    id: config.id,
    message: count.toString()
  })
  count = 0;
}, config.interval * 1000)
