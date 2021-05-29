import { getModuleConfig } from '../Api/ModuleApi.js'
import _ from 'lodash'

const validator = {
  required: value => !_.isEmpty(value)
}

export const validate = (module, config) => {
  return getModuleConfig(module).then(moduleConfig => _
    .chain(moduleConfig.fields)
    .map(field => validateRow(field, config[field.name]))
    .filter(error => !_.isEmpty(error))
    .value()
  )
}

const validateRow = (field, value) => {
  const errors = {}
  if (field.validator) {
    if (!validator[field.validator](value)) {
      errors[field.name] = field.validator
    }
  }
  return errors
}

