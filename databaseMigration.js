import {setConstants} from './config/constants.js';
setConstants();

import {ShellSubscriptions} from './src/Modules/Shell/model/ShellSubscriptions.js';
import {ShellSenders} from './src/Modules/Shell/model/ShellSenders.js';
import {MqttMessages} from './src/Modules/MqttLogger/model/mqttMessages.js';
import {MessagesCounter} from './src/Modules/MessageCounter/model/MessagesCounter.js';
import {MotionSensors} from './src/Modules/MotionSensor/model/MotionSensors.js';
import {DoubleClick} from './src/Modules/DoubleClick/model/DoubleClick.js';

Promise.all([
  ShellSubscriptions.sync(),
  ShellSenders.sync(),
  MqttMessages.sync(),
  MessagesCounter.sync(),
  MotionSensors.sync(),
  DoubleClick.sync(),
]).then(() => {
  process.exit(0);
});


