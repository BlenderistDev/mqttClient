import { getModuleConfig } from '../Api/ModuleApi.js'
import * as R from 'ramda'

const validators = {
  required: {
    validate: value => !R.isEmpty(value),
    message: field => `Field ${field} is required.`
  },
  positiveNumber: {
    validate: value => parseInt(value) > 0,
    message: (field, value) => `Field ${field} must be more than 0. ${value} given.`
  }
}

const makeValidation = R.curry((value, validator) => validator.validate(value))
const getValidationMessage = R.curry((field, value, validator) => validator.message(field.name, value))
const getValidator = validator => validators[validator]

const validateField = (field, value) => R.ifElse(
  makeValidation(value),
  () => null,
  getValidationMessage(field, value)
)

const validateRow = (field, value) => R.map(R.pipe(
  getValidator,
  validateField(field, value),
))

const getFieldValidators = (config) => R.ifElse(
  R.has('validator'),
  (field) => validateRow(field, config[field.name])(field.validator),
  () => []
)

const prepareConfig = config => R.pipe(
  R.andThen(R.prop('fields')),
  R.andThen(R.map(R.pipe(
    getFieldValidators(config),
    R.reject(R.isNil)
  ))),
  R.andThen(R.reject(R.isEmpty)),
)

export const validate = (module, config) => prepareConfig(config)(getModuleConfig(module))
