import React, { Fragment } from "react"
import Select from "react-select"
import { Link } from "react-router-dom"
import { reduxForm, Field } from "redux-form"
import { Translate } from "react-localize-redux"

import PostField from "./PostField"
import PostInputFields from "./PostInputFields"

class PostForm extends React.Component {
  renderFields() {
    return PostInputFields.map(({ label, name, textarea }) => (
      <Field
        textarea={textarea}
        key={name}
        component={PostField}
        type="text"
        label={label}
        name={name}
      />
    ))
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.props.handleSubmit(this.props.onPostSubmit)}>
          {this.renderFields()}
          <div className="field">
            <Translate>
              {({ translate }) => (
                <Select
                  className="select"
                  placeholder={translate(
                    "departments.manage-departments.select"
                  )}
                  // options={}
                  name="tags"
                  isMulti
                  value={this.props.tags}
                  onChange={this.props.handleSelectChange}
                />
              )}
            </Translate>
          </div>
          <div className="actions">
            <Link to="/dashboard">Cancel</Link>
            <button type="submit">
              <span>Next</span>
              <i className="fas fa-angle-right" />
            </button>
          </div>
        </form>
      </Fragment>
    )
  }
}

function validate(values) {
  const errors = {}
  PostInputFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${label}`
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: "postForm",
  destroyOnUnmount: false
})(PostForm)
