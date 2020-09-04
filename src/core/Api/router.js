import express from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();
import {ApiError} from './ApiError.js';
import {RequestHandler} from './RequestHandler.js';

/**
 * обработка маршрутов api
 */
router.post('/api', async function(req, res, next) {
  let result;
  const oRequestHandler = new RequestHandler(req, res);
  try {
    result = await oRequestHandler.handleRequest();
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
    console.error(error);
    return 'Internal server error';
  }
}

export {router};
