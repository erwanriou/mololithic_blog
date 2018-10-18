const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let errors = {}
  data.title = !isEmpty(data.title) ? data.title : ''
  data.body = !isEmpty(data.body) ? data.body : ''
  data.asana = !isEmpty(data.asana) ? data.asana : ''

  if (!Validator.isLength(data.body, { min: 10, max: 3000})) {
    errors.body = 'Post must be between 10 and 3000 characters'
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required'
  }
  if (Validator.isEmpty(data.body)) {
    errors.body = 'Body field is required'
  }
  if (Validator.isEmpty(data.asana)) {
    errors.asana = 'Asana field is required'
  }
  return {
    errors,
    isValid: isEmpty(errors),
  }
}
