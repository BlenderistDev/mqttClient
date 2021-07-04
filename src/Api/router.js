import express from 'express';
import {
  getModuleConfig,
  setModuleConfig,
  getGroupList,
} from '../core/ModuleConfig.js'
import { restartModule } from '../core/ModuleManager.js'
import { getMessages } from '../core/Storage.js';

const router = express.Router();

router.get('/api/modules/:group/list', async (req, res,) => res.send(await getGroupList(req.params.group.toString())));

router.get('/api/modules/:group/:moduleName', async (req, res) => res.send(await getModuleConfig(req.params.group.toString(), req.params.moduleName.toString())));

router.post('/api/modules/:moduleName', async (req, res) => res.send(await setModuleConfig(req.body.config)));

router.post('/api/restart', (req, res) => res.send(restartModule(req.body.name, req.body.group)));

router.post('/api/messages', async (req, res) => res.send(await getMessages(req.body.filter, req.body.limit)));

export { router };
