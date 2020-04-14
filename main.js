const path = require('path');
// подключаем константы
require('./config/constants');
// подключаем mqtt подписчиков
require(path.join(process.env.MODULE_DIR, 'Main', 'Subscriber'));
// подключаем mqtt отправителей
require(path.join(process.env.MODULE_DIR, 'Main', 'Sender'));
// подключаем Api
require(path.join(process.env.API_DIR, 'ApiServer'));
