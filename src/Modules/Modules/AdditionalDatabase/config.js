import config from '../../Storage/Database/config.js'

const moduleConfig = { ...config }

moduleConfig.type = 'List'
moduleConfig.name = 'AdditionalDatabase'
moduleConfig.title = 'Database'

export default moduleConfig