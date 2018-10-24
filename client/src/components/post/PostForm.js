import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

import PostField from './PostField'
import PostInputFields from './PostInputFields'
import { validateEmails } from '../../utils/validateEmails'


class PostForm extends React.Component {
  renderFields() {
    return PostInputFields.map(({ label, name }) =>
		<Field
      key={name}
      component={PostField}
      type="text"
      label={label}
      name={name} />
		)
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.props.handleSubmit(this.props.onPostSubmit)}>
          {this.renderFields()}
          <Link to='/dashboard'>Cancel</Link>
          <button type='submit'>
            <span>Next</span>
            <i className="fas fa-angle-right"></i>
          </button>
        </form>
      </Fragment>
    )
  }
}

function validate(values) {
  const errors = {}
  errors.emails = validateEmails(values.emails || '')
  PostInputFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${label}`;
    }
  })

  return errors
}

export default reduxForm({ validate, form: 'postForm', destroyOnUnmount: false })(PostForm)
