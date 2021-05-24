const moduleConfig = JSON.parse(process.argv[2])

export const config = moduleConfig.config
export const name = moduleConfig.name
export const mqttPrefix = moduleConfig.mqttPrefix
export const topic = `${moduleConfig.mqttPrefix}/${name}`
