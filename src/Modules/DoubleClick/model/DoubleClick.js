import Sequelize from 'sequelize';
import {ModelPrototype} from '../../../core/index.js';

const sequelize = ModelPrototype.getSequelize();

/**
 * Модель для счетчика сообщений
 */
export class DoubleClick extends ModelPrototype {
}

DoubleClick.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  interval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  in_topic: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  attribute: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {sequelize, modelName: 'double_click'});


