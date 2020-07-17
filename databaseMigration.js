require('./config/constants');

const ShellSubscriptions = require('./src/Modules/Shell/model/ShellSubscriptions');
const Subscriptions = require('./src/Modules/Main/model/Subscriptions');
const ShellSenders = require('./src/Modules/Shell/model/ShellSenders');
const MqttMessages = require('./src/Modules/MqttLogger/model/mqttMessages');
const MessagesCounter = require('./src/Modules/MessageCounter/model/MessagesCounter');
const Ping = require('./src/Modules/Ping/model/Ping');

ShellSubscriptions.sync();
Subscriptions.sync();
ShellSenders.sync();
MqttMessages.sync();
MessagesCounter.sync();
Ping.sync();
