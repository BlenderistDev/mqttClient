import Sequelize from 'sequelize';
import {ModelPrototype} from '../../../core/index.js';

const sequelize = ModelPrototype.getSequelize();

/**
 * Модель для счетчика сообщений
 */
export class MessagesCounter extends ModelPrototype {
}

MessagesCounter.init({
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
}, {sequelize, modelName: 'message_counter'});


