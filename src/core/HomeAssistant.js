import {getConfig} from './Config.js';
import {mqttClient} from './MqttClient.js';
import md5 from 'md5';

const mqttConfig = getConfig('mqtt')
const mqttPrefix = mqttConfig.topic
/**
 * Отправляем сообщение для автообнаружения в HomeAssistant
 * @param {string} name имя устройства
 * @param {string} stateTopic топик устройства
 * @param {string} deviceType тип
 * @param {object} params дополнительные параметры
 */
export function sendDiscoveryMessage(name, stateTopic, deviceType, params = {}) {
  const topicHash = md5(stateTopic);
  const mqttPrefixHash = md5(mqttPrefix);
  const oMinimalConfig = {
    name: `${name}_${topicHash}`,
    unique_id: `${name}_${topicHash}`,
    state_topic: stateTopic,
    device: {
      'identifiers': [
        'mqttClient_' + mqttPrefixHash,
      ],
      'name': `${mqttPrefix}`,
      'model': 'mqtt client',
    },
  };
  const oHomeAssistantDiscoveryConfig = {...params, ...oMinimalConfig};
  mqttClient.sendMessage(`homeassistant/${deviceType}/${topicHash}/${name}/config`, JSON.stringify(oHomeAssistantDiscoveryConfig), true);
}
