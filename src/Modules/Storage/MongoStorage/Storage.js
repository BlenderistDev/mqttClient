import { getConfig } from '../../../core/Config.js'
import MongoClient from 'mongodb';

export const get = (filter, limit) => {
  const config = getConfig('Mongo')

  const uri =
  `mongodb://${config.user}:${config.password}@${config.host}?retryWrites=true&authSource=${config.database}`;

  const client = new MongoClient.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client.connect().then(() => {
    const database = client.db(config.database)
    const collection = database.collection(config.collection)
    const queryFilter = {
      date: {}
    }
    if (filter.before) {
      queryFilter.date.$lt = new Date(filter.before)
    }
    if (filter.after) {
      queryFilter.date.$gt = new Date(filter.after)
    }
    return collection
      .find(queryFilter)
      .limit(parseInt(limit.limit))
      .skip(parseInt(limit.skip))
      .toArray()
  }).then(data => {
    client.close()
    return data
  })
}
