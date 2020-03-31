require('./config/constants');

const ShellSubscriptions = require('./src/Modules/Shell/model/ShellSubscriptions').sync;
const Subscriptions = require('./src/Modules/Main/model/Subscriptions').sync;
const Senders = require('./src/Modules/Main/model/Senders').sync;
const ShellSenders = require('./src/Modules/Shell/model/ShellSenders').sync;
const MqttMessages = require('./src/Modules/MqttLogger/model/mqttMessages').sync;
const MessagesCounter = require('./src/Modules/MessageCounter/model/MessagesCounter').sync;

ShellSubscriptions.sync();
Subscriptions.sync();
Senders.sync();
ShellSenders.sync();
MqttMessages.sync();
MessagesCounter.sync();
