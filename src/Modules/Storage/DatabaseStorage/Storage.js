import { getConfig } from '../../../core/Config.js'
import Sequelize from "sequelize";
import * as R from 'ramda'

const config = getConfig('DatabaseStorage')

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false
});

export class Messages extends Sequelize.Model {}

Messages.init({
  topic: Sequelize.DataTypes.STRING,
  message: Sequelize.DataTypes.STRING,
  qos: Sequelize.DataTypes.INTEGER,
  date: Sequelize.DataTypes.DATE
}, { sequelize, modelName: config.table });

export const get = (filter, limit) => Messages.findAll({
  where: getWhere(filter),
  limit: parseInt(limit.limit),
  offset: limit.skip,
})

const isEmpty = R.either(R.isNil, R.isEmpty)

const getWhere = filter => {
  const where = {}
  if (!isEmpty(filter.before) && !isEmpty(filter.after)) {
    where.date = { [Sequelize.Op.between]: [new Date(filter.after), new Date(filter.before)] }
  } else if (!isEmpty(filter.before)) {
    where.date = { [Sequelize.Op.lte]: new Date(filter.before) }
  } else if (!isEmpty(filter.after)) {
    where.date = { [Sequelize.Op.gte]: new Date(filter.after) }
  }
  if (!isEmpty(filter.topic)) {
    where.topic = {[Sequelize.Op.like]: `%${filter.topic}%` }
  }
  if (!isEmpty(filter.message)) {
    where.message = {[Sequelize.Op.like]: `%${filter.message}%` }
  }
  return where
}

