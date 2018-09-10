const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''
  data.title = !isEmpty(data.title) ? data.title : ''
  data.img = !isEmpty(data.img) ? data.img : ''

  if (!Validator.isLength(data.text, { min: 10, max: 3000})) {
    errors.text = 'Post must be between 10 and 3000 characters'
  }

  if (Validator.isEmpty(data.title)) {
    errors.text = 'Title field is required'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required'
  }

  if (Validator.isEmpty(data.img)) {
    errors.img = 'Image field is required'
  }


  return {
    errors,
    isValid: isEmpty(errors),
  }
}
