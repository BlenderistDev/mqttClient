import express from 'express';
import {
  getModuleConfig,
  setModuleConfig,
  getGroupList,
} from '../core/ModuleConfig.js'
import { restartModule } from '../core/ModuleManager.js'
import { getMessages } from '../core/Storage.js';

const router = express.Router();

router.get('/api/module/list', async (req, res,) => res.send(await getGroupList('Modules')));

router.get('/api/module/:moduleName', async (req, res) => res.send(await getModuleConfig('Modules', req.params.moduleName.toString())));

router.post('/api/module/:moduleName', async (req, res) => res.send(await setModuleConfig(req.body.config)));

router.post('/api/restart', (req, res) => res.send(restartModule(req.body.name, req.body.group)));

router.get('/api/storage/list', async (req, res,) => res.send(await getGroupList('Storage')));

router.get('/api/storage/:moduleName', async (req, res) => res.send(await getModuleConfig('Storage', req.params.moduleName.toString())));

router.post('/api/messages', async (req, res) => res.send(await getMessages(req.body.filter, req.body.limit)));

export { router };
