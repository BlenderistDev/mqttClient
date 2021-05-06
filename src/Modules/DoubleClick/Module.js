import md5 from 'md5'
import {ClickWatcher} from './Click.js'
import _ from 'lodash'
import { mqttClient } from '../../core/SocketClient.js'

const config = JSON.parse(process.argv[2])
const clickWatchers = _.map(config.config, row => new ClickWatcher(row, config.topic + '/' + md5(row.in_topic)))

mqttClient.on('message', (mqttMessage) => {
  clickWatchers.forEach((clickWatcher) => {
    if (clickWatcher.getInTopic() === mqttMessage.topic) {
      clickWatcher.handleClick(JSON.parse(mqttMessage.message));
    }
  });
});
