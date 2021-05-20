import {sendDiscoveryMessage} from '../../Components/HomeAssistant.js';
import { mqttClient, moduleClient } from "../../Components/SocketClient.js";
import { config, topic } from "../../Components/ModuleConfig.js";

const measureSubTopic = topic + '/measure';
const resultSubTopic = topic + '/result';

sendDiscoveryMessage('ping', resultSubTopic, 'sensor', { unit_of_measurement: 'c' });

const interval = parseInt(config.interval)
if (interval > 0) {
  setInterval(() => mqttClient.send(measureSubTopic, JSON.stringify({ timestamp: Date.now() })), interval * 1000);
}

mqttClient.on('message', (mqttMessage) => {
  if (mqttMessage.topic === measureSubTopic) {
    const message = JSON.parse(mqttMessage.message);
    const ping = (Date.now() - message.timestamp)/1000;
    mqttClient.send(resultSubTopic, ping.toString());
    moduleClient.send(ping.toString())
  }
});
