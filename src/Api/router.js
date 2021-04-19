import express from 'express';
import fs from 'fs'
import { getModuleConfig, setModuleConfig } from './ModuleApi.js'
import { restartModule } from '../core/ModuleManager.js'

const router = express.Router();

router.get('/api/module/list', async function(req, res, next) {
  res.send(await fs.promises.readdir('src/Modules').then(module => module))
});

router.get('/api/module/:moduleName', async function(req, res, next) {
  res.send(await getModuleConfig(req.params.moduleName))
});

router.post('/api/module/:moduleName', async function(req, res, next) {
  res.send(await setModuleConfig(req.body.config))
});

router.get('/api/restart/:moduleName', function(req, res, next) {
  res.send(restartModule(req.params.moduleName))
});

export {router};
