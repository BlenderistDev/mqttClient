import {mqttPrefix} from './ModuleConfig.js'
import {getConfig} from "../core/Config.js";
import mqtt from "mqtt";
import {getConnectionOptions} from "./MqttConnection.js";

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
    name: name,
    unique_id: uniqueName,
    state_topic: stateTopic,
    device: {
      'identifiers': [
        'mqttClient_' + mqttPrefix,
      ],
      'name': `${mqttPrefix}`,
      'model': 'mqtt client',
    },
  };
  const oHomeAssistantDiscoveryConfig = {...params, ...oMinimalConfig};
  sendMqttMessage(`homeassistant/${deviceType}/${uniqueName}/${name}/config`, JSON.stringify(oHomeAssistantDiscoveryConfig))
}

function sendMqttMessage(topic, message) {
  const mqttConfig = getConfig("Mqtt")
  const connection = mqtt.connect(mqttConfig.host, getConnectionOptions(mqttConfig))
  connection.on('connect', () => {
    connection.publish(topic, message, { retain: true })
  })
}