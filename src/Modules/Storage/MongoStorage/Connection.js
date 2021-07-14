import MongoClient from "mongodb";

export const getClient = config => {
  const uri =
  `mongodb://${config.user}:${config.password}@${config.host}?retryWrites=true&writeConcern=majority&authSource=${config.database}`;

  return new MongoClient.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
