import Sequelize from 'sequelize';
import {ModelPrototype} from '../../../core/index.js';

const sequelize = ModelPrototype.getSequelize();

/**
 * Модель для подписчика командной строки
 */
export class ShellSenders extends ModelPrototype {
}

ShellSenders.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  command: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  topic: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  interval: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {sequelize, modelName: 'shell_senders'});


