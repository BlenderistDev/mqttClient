import express from 'express';
import {
  getModuleConfig,
  getStorageConfig,
  setModuleConfig,
  getModuleList,
  getStorageList,
} from '../core/ModuleConfig.js'
import { restartModule } from '../core/ModuleManager.js'
import { getMessages } from '../core/Storage.js';

const router = express.Router();

router.get('/api/module/list', async (req, res,) =>res.send(await getModuleList()));

router.get('/api/module/:moduleName', async (req, res) => res.send(await getModuleConfig(req.params.moduleName.toString())));

router.post('/api/module/:moduleName', async (req, res) => res.send(await setModuleConfig(req.body.config)));

router.post('/api/restart', (req, res) => res.send(restartModule(req.body.name, req.body.group)));

router.get('/api/storage/list', async (req, res,) =>res.send(await getStorageList()));

router.get('/api/storage/:moduleName', async (req, res) => res.send(await getStorageConfig(req.params.moduleName.toString())));

router.post('/api/messages', async (req, res) => res.send(await getMessages(req.body.filter, req.body.limit)));

export { router };
