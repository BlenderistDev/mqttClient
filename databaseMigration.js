require('./config/constants');

const ShellSubscriptions = require('./src/Modules/Shell/model/ShellSubscriptions');
const Subscriptions = require('./src/Modules/Main/model/Subscriptions');
const Senders = require('./src/Modules/Main/model/Senders');
const ShellSenders = require('./src/Modules/Shell/model/ShellSenders');
const MqttMessages = require('./src/Modules/MqttLogger/model/mqttMessages');
const MessagesCounter = require('./src/Modules/MessageCounter/model/MessagesCounter');

ShellSubscriptions.sync();
Subscriptions.sync();
Senders.sync();
ShellSenders.sync();
MqttMessages.sync();
MessagesCounter.sync();
