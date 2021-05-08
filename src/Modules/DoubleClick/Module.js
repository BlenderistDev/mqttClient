import md5 from 'md5'
import {ClickWatcher} from './Click.js'
import _ from 'lodash'
import { mqttClient } from '../../Components/SocketClient.js'
import { config, topic } from "../../Components/ModuleConfig.js";

const clickWatchers = _.map(config, row => new ClickWatcher(row, topic + '/' + md5(row.in_topic)))

mqttClient.on('message', (mqttMessage) => {
  clickWatchers.forEach((clickWatcher) => {
    if (clickWatcher.getInTopic() === mqttMessage.topic) {
      clickWatcher.handleClick(JSON.parse(mqttMessage.message));
    }
  });
});
