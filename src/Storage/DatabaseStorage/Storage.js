import { getConfig } from '../../core/Config.js'
import Sequelize from "sequelize";

const config = getConfig('DatabaseStorage')

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  logging:false
});

export class Messages extends Sequelize.Model {}

Messages.init({
  topic: Sequelize.DataTypes.STRING,
  message: Sequelize.DataTypes.STRING,
  qos: Sequelize.DataTypes.INTEGER,
  date: Sequelize.DataTypes.DATE
}, { sequelize, modelName: config.table });

export const get = (filter, limit) => Messages.findAll({
  where: {
    date: {
      [Sequelize.Op.between]: [new Date(filter.after), new Date(filter.before)]
    }
  }
})

