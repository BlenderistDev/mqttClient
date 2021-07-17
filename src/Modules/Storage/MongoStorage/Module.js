import { mqttClient } from '../../../Components/SocketClient.js'
import { config } from "../../../Components/ModuleConfig.js";
import { getClient } from "./Connection.js";
import { Flushable } from "../../../Components/Flushable.js";

const client = getClient(config)
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
    setInterval(() => collection.insertMany(flushable.flush()), config.interval * 1000)
  } else {
    mqttClient.on('message', message => {
      message.date = new Date(message.date)
      collection.insertOne(message)
    });
  }
})
