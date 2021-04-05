import express from 'express';
import { getManager } from '../../core/index.js'
import { getModuleConfig, setModuleConfig } from './ModuleApi.js'

const router = express.Router();

router.get('/api/module/list', async function(req, res, next) {
  res.send(getManager().aModules);
});

router.get('/api/module/:moduleName', async function(req, res, next) {
  res.send(await getModuleConfig(req.params.moduleName))
});

router.post('/api/module/:moduleName', async function(req, res, next) {
  res.send(await setModuleConfig(req.body.config))
});

router.get()
export {router};
