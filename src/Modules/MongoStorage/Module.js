import { mqttClient } from '../../Components/SocketClient.js'
import { config } from "../../Components/ModuleConfig.js";
import MongoClient from 'mongodb';

const uri =
  `mongodb://${config.user}:${config.password}@${config.host}?retryWrites=true&writeConcern=majority&authSource=${config.database}`;

const client = new MongoClient.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect().then(() => {
  const database = client.db(config.database);
  const collection = database.collection(config.collection);
  mqttClient.on('message', message => collection.insertOne(message));
}).catch(console.dir);


