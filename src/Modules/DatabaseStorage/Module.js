import { mqttClient } from '../../Components/SocketClient.js'
import { config } from "../../Components/ModuleConfig.js";
import mysql from 'mysql';
import _ from 'lodash'

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password
});

connection.connect();

const table = connection.escapeId(config.table)
const database = connection.escapeId(config.database)

connection.query(`USE ${database};`)
connection.query(`CREATE TABLE IF NOT EXISTS ${table} (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(512) NOT NULL,
  message TEXT NOT NULL,
  qos INT(2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`)

let messages = []
mqttClient.on('message', message => messages.push(message))

const flushMessages = () => {
  const flushed = messages
  messages = []
  return flushed
}

setInterval(() => {
  const messages = flushMessages()
  const data = _.chain(messages)
    .map(message => _.pick(message, ['topic', 'message', 'qos']))
    .flatMap()
    .value()
  const valuesTemplate = _.repeat('(?),', messages.length).slice(0, -1)
  connection.query(`INSERT INTO ${table}(topic, message, qos) VALUES ${valuesTemplate}`, data, function(err, rows, fields) {
    if (err) console.log(err);
  })
}, 5000)
