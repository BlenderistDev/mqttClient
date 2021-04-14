import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fs from 'fs';
import {router} from './router.js';
import cors from 'cors';
import http from 'http'

const app = express();

// cоздаем поток для логгера
const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'log', 'access.log'), {flags: 'a'});
// запускаем логгер
app.use(logger('combined', {stream: accessLogStream}));
// подключаем папку со статикой
app.use(express.static('front/dist'));
// обработка
app.use(express.json());
// urlencodим данные
app.use(express.urlencoded({extended: false}));
// куки
app.use(cookieParser());
// для обработки запросов не с localhost
app.use(cors());
// подключаем обработчик маршрутов
app.use('/', router);

app.use(async (req, res) => res.send(fs.readFileSync('front/dist/index.html')));

const port = process.env.PORT || 4000
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', (error) => console.error(error));

export {app};

