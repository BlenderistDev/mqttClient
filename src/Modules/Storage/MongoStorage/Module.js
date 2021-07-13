import { mqttClient } from '../../../Components/SocketClient.js'
import { config } from "../../../Components/ModuleConfig.js";
import { client } from "./Connection.js";
import { Flushable } from "../../../Components/Flushable.js";

const interval = parseInt(config.interval)
client.connect().then(() => {
  const database = client.db(config.database);
  const collection = database.collection(config.collection);

  if (interval > 0) {
    const flushable = new Flushable()
    mqttClient.on('message', message => {
      message.date = new Date(message.date)
      flushable.push(message)
    });
    collection.insertMany(flushable.flush())
  } else {
    mqttClient.on('message', message => {
      message.date = new Date(message.date)
      collection.insertOne(message)
    });
  }
})
