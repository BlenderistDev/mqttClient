import { setConstants } from './config/constants.js';
import { getManager } from './src/core/index.js';
import {app} from './src/core/index.js';

setConstants();
getManager().start()

const api = app;

