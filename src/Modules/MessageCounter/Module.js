import {Counter} from './Counter.js';
import _ from 'lodash'

const config = JSON.parse(process.argv[2]);
const counters = [];

_.map(config.config, row => {
  const counterName = `messages_in_${row.interval}_sec`;
  const counterTopic = `${config.topic}/${counterName}`;
  counters.push(new Counter(counterTopic, row.interval, counterName));
})

process.on('message', (mqttMessage) => {
  counters.forEach((oCounter) => {
    oCounter.increase();
  });
});
