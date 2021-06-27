export const get = (limit, offset) => {
  const database = client.db(config.database)
  const collection = database.collection(config.collection)
  const cursor = collection.find({}).limit(limit).skip(offset)
  return cursor.toArray()
}