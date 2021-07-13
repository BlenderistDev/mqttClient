import { mqttClient } from '../../../Components/SocketClient.js'
import { config } from "../../../Components/ModuleConfig.js";
import { client } from "./Connection.js";

client.connect().then(() => {
  const database = client.db(config.database);
  const collection = database.collection(config.collection);
  mqttClient.on('message', message => {
    message.date = new Date(message.date)
    collection.insertOne(message)
  });
})
