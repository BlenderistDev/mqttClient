const Subscriber = require('./modules/Subscriber/Subscriber');
const Sender = require('./modules/Sender/Sender');

new Subscriber();
new Sender();

require('./web/init');
