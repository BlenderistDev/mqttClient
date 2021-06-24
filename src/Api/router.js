import express from 'express';
import fs from 'fs'
import {getModuleConfig, getStorageConfig, setModuleConfig} from './ModuleApi.js'
import { restartModule } from '../core/ModuleManager.js'

const router = express.Router();

router.get('/api/module/list', async (req, res,) =>res.send(await fs.promises.readdir('src/Modules').then(module => module)));

router.get('/api/module/:moduleName', async (req, res) => res.send(await getModuleConfig(req.params.moduleName.toString())));

router.post('/api/module/:moduleName', async (req, res) => res.send(await setModuleConfig(req.body.config)));

router.post('/api/restart', (req, res) => res.send(restartModule(req.body.name, req.body.group)));

router.get('/api/storage/list', async (req, res,) =>res.send(await fs.promises.readdir('src/Storage').then(module => module)));

router.get('/api/storage/:moduleName', async (req, res) => res.send(await getStorageConfig(req.params.moduleName.toString())));

export { router };
