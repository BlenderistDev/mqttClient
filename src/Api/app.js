const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const router = require('./router');
const cors = require('cors');

const app = express();

// cоздаем поток для логгера
const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'log', 'access.log'), {flags: 'a'});
// запускаем логгер
app.use(logger('combined', {stream: accessLogStream}));
// обработка
app.use(express.json());
// urlencodим данные
app.use(express.urlencoded({extended: false}));
// куки
app.use(cookieParser());
// для обработки запросов не с localhost
app.use(cors());
// подключаем папку для статических файлов
app.use(express.static(path.join(__dirname, 'public')));
// подключаем обработчик маршрутов
app.use('/', router);

module.exports = app;
