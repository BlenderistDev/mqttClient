import Sequelize from 'sequelize';
import {ModelPrototype} from '../../../core/index.js';

const sequelize = ModelPrototype.getSequelize();

/**
 * Модель для обертки датчика движения
 */
export class MotionSensors extends ModelPrototype {
}

MotionSensors.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  in_topic: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  in_motion_message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  in_no_motion_message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  out_motion_message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  out_no_motion_message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  min_delay: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {sequelize, modelName: 'motion_sensors'});


