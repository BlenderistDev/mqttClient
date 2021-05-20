import {getConfig} from "../core/Config.js";

const mqttConfig = getConfig('Mqtt')
const mqttPrefix = mqttConfig.topic

const moduleConfig = JSON.parse(process.argv[2])

export const config = moduleConfig.config
export const name = moduleConfig.name
export const topic = `${mqttPrefix}/${name}`
