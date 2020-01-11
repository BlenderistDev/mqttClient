const path = require('path');
process.env.SOURCE_DIR = path.join(process.cwd(), 'src');
process.env.MODULE_DIR = path.join(process.env.SOURCE_DIR, 'Modules');
process.env.API_DIR = path.join(process.env.SOURCE_DIR, 'Api');
process.env.CONFIG_DIR = path.join(process.cwd(), 'config');
