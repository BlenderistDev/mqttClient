import Sequelize from "sequelize";
import {config} from "../../../Components/ModuleConfig.js";

export const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging:false
});
