import config from '../../Storage/Mongo/config.js'
import _ from 'lodash'

const moduleConfig = { ...config }

moduleConfig.type = 'List'
moduleConfig.name = 'AdditionalMongo'
moduleConfig.title = 'Mongo'

export default moduleConfig