const ShellSubscriptions = require('./modules/shell/model/ShellSubscriptions').sync;
const Subscriptions = require('./handlers/model/Subscriptions').sync;
const Senders = require('./handlers/model/Senders').sync;
const ShellSenders = require('./modules/shell/model/ShellSenders').sync;
const MqttMessages = require('./modules/mqttLogger/model/mqttMessages').sync;
const MessagesCounter = require('./modules/messageCounter/model/MessagesCounter').sync;

ShellSubscriptions.sync();
Subscriptions.sync();
Senders.sync();
ShellSenders.sync();
MqttMessages.sync();
MessagesCounter.sync();
