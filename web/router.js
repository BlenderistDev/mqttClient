const express = require('express');
const path = require('path');
// eslint-disable-next-line new-cap
const router = express.Router();
const ApiError = require('./ApiError');
const fsPromises = require('fs').promises;

/**
 * обработка маршрутов api
 */
router.post('/mqtt', async function(req, res, next) {
  let result;
  try {
    result = await handleRequest(req);
  } catch (error) {
    result = handleError(error);
    res.status(500);
  } finally {
    res.send(result);
  }
});

/**
 * Обрабатываем ошибку
 * @param {Error} error
 * @return {string}
 */
function handleError(error) {
  if (error instanceof ApiError) {
    return error.message;
  } else {
    console.log(error.message);
    return 'Internal server error';
  }
}

/**
 * Выполняет запрос
 * @param {object} req
 * @return {Promise}
 */
async function handleRequest(req) {
  const sCmd = getCmd(req);
  const oController = await getModuleApi(req);
  return executeCmd(oController, sCmd);
}

/**
 * Возвращает контроллер Api запрашиваемого модуля
 * @param {object} req
 * @return {Promise}
 */
function getModuleApi(req) {
  sModuleName = getModuleName(req);
  const sControllerPath = path.join(process.cwd(), 'modules', sModuleName, 'Api.js');
  return fsPromises.access(sControllerPath).then(()=>{
    const Controller = require(sControllerPath);
    return new Controller(req);
  }).catch((error) => {
    console.log(error);
    throw new ApiError(`Undefined module ${sModuleName}`);
  });
}
/**
 * Выполняет комманду
 * @param {ApiPrototype} oController
 * @param {string} sCmd
 * @return {mixed}
 */
function executeCmd(oController, sCmd) {
  const sMethodName = `cmd${sCmd}`;
  if (!(sMethodName in oController)) {
    throw new ApiError(`Command ${sCmd} not found`);
  }
  return oController[sMethodName]();
}


/**
 * Возвращает запращиваемую команду
 * @param {object} req
 * @return {string}
 */
function getCmd(req) {
  if (req.body.cmd == undefined) {
    throw new Error('undefined cmd');
  }
  return toUpperCaseFirstLetter(req.body.cmd);
}

/**
 * Возвращает имя запрашиваемого модуля
 * @param {object} req
 * @return {string}
 */
function getModuleName(req) {
  if (req.body.module == undefined) {
    throw new Error('undefined module name');
  }
  return toUpperCaseFirstLetter(req.body.module);
}

/**
 * Переводит первую букву строки в верхний регистр
 * @param {string} sStr
 * @return {string}
 */
function toUpperCaseFirstLetter(sStr) {
  return sStr[0].toUpperCase() + sStr.substr(1);
}

module.exports = router;
