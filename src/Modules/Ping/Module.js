import {sendDiscoveryMessage} from '../../core/HomeAssistant.js';
import { mqttClient, moduleClient } from "../../core/SocketClient.js";
import { topic } from "../../Components/ModuleConfig.js";

const measureSubTopic = topic + '/measure';
const resultSubTopic = topic + '/result';

sendDiscoveryMessage('ping', resultSubTopic, 'sensor', { unit_of_measurement: 'c' });

setInterval(() => mqttClient.send(measureSubTopic, JSON.stringify({ timestamp: Date.now() })), 1000);

mqttClient.on('message', (mqttMessage) => {
  if (mqttMessage.topic === measureSubTopic) {
    const message = JSON.parse(mqttMessage.message);
    const ping = (Date.now() - message.timestamp)/1000;
    mqttClient.send(resultSubTopic, ping.toString());
    moduleClient.send(ping.toString())
  }
});
