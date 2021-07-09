import Sequelize from "sequelize";
import { config } from "../../../Components/ModuleConfig.js";
import { sequelize } from "./Connection.js";

export class Messages extends Sequelize.Model {}

Messages.init({
  topic: Sequelize.DataTypes.STRING,
  message: Sequelize.DataTypes.STRING,
  qos: Sequelize.DataTypes.INTEGER,
  date: Sequelize.DataTypes.DATE
}, { sequelize, modelName: config.table });
