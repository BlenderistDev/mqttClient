import { mqttClient } from './SocketClient.js'
import { mqttPrefix } from './ModuleConfig.js'

/**
 * Отправляем сообщение для автообнаружения в HomeAssistant
 * @param {string} name имя устройства
 * @param {string} stateTopic топик устройства
 * @param {string} deviceType тип
 * @param {object} params дополнительные параметры
 */
export function sendDiscoveryMessage(name, stateTopic, deviceType, params = {}) {
  const uniqueName = `${mqttPrefix}_${name}`
  const oMinimalConfig = {
    name: uniqueName,
    unique_id: uniqueName,
    state_topic: stateTopic,
    device: {
      'identifiers': [
        'mqttClient_' + uniqueName,
      ],
      'name': `${mqttPrefix}`,
      'model': 'mqtt client',
    },
  };
  const oHomeAssistantDiscoveryConfig = {...params, ...oMinimalConfig};
  mqttClient.send(`homeassistant/${deviceType}/${uniqueName}/${name}/config`, JSON.stringify(oHomeAssistantDiscoveryConfig), true);
}
