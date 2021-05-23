import express from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import {router} from './router.js';
import cors from 'cors';
import http from 'http'
import { Server } from "socket.io";
import { socketHandler } from './socket.js'

const app = express();

// подключаем папку со статикой
app.use(express.static('front/dist'));
// обработка json
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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", socketHandler);

server.listen(port);
server.on('error', (error) => console.error(error));

export { app };
