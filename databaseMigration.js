const ShellSubscriptions = require('./handlers/subscriber/subscribers/ShellSubscriber/model/ShellSubscriptions').sync;
const Subscriptions = require('./handlers/subscriber/model/Subscriptions').sync;
ShellSubscriptions.sync();
Subscriptions.sync();
