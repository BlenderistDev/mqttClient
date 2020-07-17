const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

/**
 * подключает отправителей
 */
async function requireSenders() {
  const aModuleDirList = await fs.promises.readdir(process.env.MODULE_DIR);
  aModuleDirList.forEach(async (sModuleDir) => {
    const sSenderFilePath = path.join(process.env.MODULE_DIR, sModuleDir, 'Sender.js');
    fsPromises.access(sSenderFilePath, fs.constants.R_OK)
        .then(() => {
          require(sSenderFilePath);
        })
        .catch(() => {});
  });
}

module.exports = requireSenders();

