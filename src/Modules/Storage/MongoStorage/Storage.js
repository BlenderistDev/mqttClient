import { getConfig } from '../../../core/Config.js'
import { client } from "./Connection.js";

export const get = (filter, limit) => {
  const config = getConfig('Mongo')

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
