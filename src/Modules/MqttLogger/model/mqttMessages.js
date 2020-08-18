import Sequelize from 'sequelize';
import {ModelPrototype} from '../../../core/index.js';

const sequelize = ModelPrototype.getSequelize();

/**
 * Модель для подписчика командной строки
 */
export class MqttMessages extends ModelPrototype {
}

MqttMessages.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  topic: {
    type: Sequelize.TEXT,
  },
  message: {
    type: Sequelize.TEXT,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {sequelize, modelName: 'mqtt_messages'});


