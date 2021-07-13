import { config } from "../../../Components/ModuleConfig.js";
import MongoClient from "mongodb";

const uri =
  `mongodb://${config.user}:${config.password}@${config.host}?retryWrites=true&writeConcern=majority&authSource=${config.database}`;

export const client = new MongoClient.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
