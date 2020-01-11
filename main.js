const path = require('path');
require('./config/constants');

const Subscriber = require(path.join(process.env.MODULE_DIR, 'Subscriber', 'Subscriber'));
const Sender = require(path.join(process.env.MODULE_DIR, 'Sender', 'Sender'));

new Subscriber();
new Sender();

require(path.join(process.env.API_DIR, 'init'));
