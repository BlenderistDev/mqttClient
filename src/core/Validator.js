import { getModuleConfig } from '../Api/ModuleApi.js'
import _ from 'lodash'

const validators = {
  required: value => !_.isEmpty(value),
  positiveNumber: value => parseInt(value) > 0
}

export const validate = (module, config) => {
  return getModuleConfig(module).then(moduleConfig => _
    .chain(moduleConfig.fields)
    .map(field => validateRow(field, config[field.name]))
    .flatMap()
    .filter(error => !_.isEmpty(error))
    .value()
  )
}

const validateRow = (field, value) => {
  const errors = []
  if (field.validator) {
    _.map(field.validator, validator => {
      if (!validators[validator](value)) {
        errors.push(validator)
      }
    })
  }
  return errors
}

