import { getConfig } from '../../core/Config.js'
import MongoClient from 'mongodb';

export const get = (filter, limit) => {
  const config = getConfig('Mongo')

  const uri =
  `mongodb://${config.user}:${config.password}@${config.host}?retryWrites=true&writeConcern=majority&authSource=${config.database}`;

  const client = new MongoClient.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.connect().then(() => {
    const database = client.db(config.database)
    const collection = database.collection(config.collection)
    const cursor = collection.find({
      date: {
        $lt: new Date(filter.before)
      }
    }).limit(parseInt(limit.limit)).skip(parseInt(limit.skip))
    return cursor.toArray()
  })

  

}