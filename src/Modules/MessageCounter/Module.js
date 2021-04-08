import {Counter} from './Counter.js';
import _ from 'lodash'

const config = JSON.parse(process.argv[2]);
const aCounters = _.map(config.value, row => {
  const counterName = `messages_in_${row.interval}_sec`;
  const counterTopic = `${config.topic}/${counterName}`;
  return new Counter(counterTopic, row.interval, counterName);
})

process.on('message', (mqttMessage) => {
  aCounters.forEach((oCounter) => {
    oCounter.increase();
  });
});
