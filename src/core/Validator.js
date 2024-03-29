import { getConfigByPath } from './ModuleConfig.js'
import * as R from 'ramda'

const validators = {
  required: {
    validate: R.pipe(R.either(R.isEmpty, R.isNil), R.not),
    message: field => `Field ${field} is required.`
  },
  positiveNumber: {
    validate: value => parseInt(value) > 0,
    message: (field, value) => `Field ${field} must be more than 0. ${value} given.`
  },
  hasProtocol: {
    validate: R.test(/.+:\/\/.+/),
    message: (field, value) => `Protocol is missing`
  }
}

const validate = R.curry((value, validator) => validator.validate(value))
const getValidationMessage = R.curry((field, value, validator) => validator.message(field.name, value))
const getValidator = validator => validators[validator]

const validateByValidator = (field, value) => R.ifElse(
  validate(value),
  () => null,
  getValidationMessage(field, value)
)

const validateField = (field, value) => R.map(R.pipe(
  getValidator,
  validateByValidator(field, value),
))

const validateConfigFields = config => R.pipe(
  R.prop('fields'),
  R.map(
    R.pipe(
      R.ifElse(
        R.has('validator'),
        (field) => validateField(field, config[field.name])(field.validator),
        () => []
      ),
      R.reject(R.isNil)
    )
  ),
  R.reject(R.isEmpty),
)

export const validateConfig = R.curry(async (module, config) => {
  return {
    config: config,
    errors: validateConfigFields(config)(await getConfigByPath(module))
  }
})
