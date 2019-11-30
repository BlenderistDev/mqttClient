const ShellSubscriptions = require('./modules/shell/model/ShellSubscriptions').sync;
const Subscriptions = require('./handlers/model/Subscriptions').sync;
const Senders = require('./handlers/model/Senders').sync;
const ShellSenders = require('./modules/shell/model/ShellSenders').sync;

ShellSubscriptions.sync();
Subscriptions.sync();
Senders.sync();
ShellSenders.sync();
