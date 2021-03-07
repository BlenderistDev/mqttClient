import { setConstants } from './config/constants.js';
import { getManager } from './src/core/index.js';
import {ApiServer} from './src/core/index.js';

setConstants();
getManager().start()
new ApiServer();

