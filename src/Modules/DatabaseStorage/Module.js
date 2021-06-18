import _ from 'lodash'
import { mqttClient } from '../../Components/SocketClient.js'
import { config } from "../../Components/ModuleConfig.js";
import mysql from 'mysql';

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password
});

connection.connect();

const database = connection.escape(config.database)
const table = connection.escape(config.table)

connection.query(`USE ${config.database}`)
connection.query(`CREATE TABLE IF NOT EXISTS ${config.table} (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(512) NOT NULL,
  message TEXT NOT NULL,
  qos INT(2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`)


mqttClient.on('message', message => {
  connection.query('INSERT INTO ' + config.table + '(topic, message, qos) VALUES (?,?,?)', [message.topic, message.message, message.qos], function(err, rows, fields) {
    if (err) throw err;
  })
})