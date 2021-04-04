import express from 'express';
const router = express.Router();
import { getManager } from '../../core/index.js'
import { getModuleConfig, setModuleConfig } from './ModuleApi.js'

router.get('/api/module/list', async function(req, res, next) {
  res.send(getManager().aModules);
});

router.get('/api/module/:moduleName', async function(req, res, next) {
  res.send(await getModuleConfig(req.params.moduleName))
});

router.post('/api/module/:moduleName', async function(req, res, next) {
  res.send(await setModuleConfig(req.body.config))
});

export {router};
