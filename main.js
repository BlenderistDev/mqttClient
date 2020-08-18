import {setConstants} from './config/constants.js';
import {ModuleManager} from './src/core/index.js';
// import {ApiServer} from './src/core/index.js';

setConstants();
new ModuleManager();
// new ApiServer();

