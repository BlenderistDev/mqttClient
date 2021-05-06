import {sendDiscoveryMessage} from '../../core/HomeAssistant.js';
import {mqttClient} from "../../core/SocketClient.js";

const config = JSON.parse(process.argv[2]);

const measureSubTopic = config.topic + '/measure';
const resultSubTopic = config.topic + '/result';

sendDiscoveryMessage('ping', resultSubTopic, 'sensor', { unit_of_measurement: 'c' });

setInterval(() => mqttClient.send(measureSubTopic, JSON.stringify({ timestamp: Date.now() })), 1000);

mqttClient.on('message', (mqttMessage) => {
  if (mqttMessage.topic === measureSubTopic) {
    const message = JSON.parse(mqttMessage.message);
    const ping = (Date.now() - message.timestamp)/1000;
    mqttClient.send(resultSubTopic, ping.toString());
  }
});
