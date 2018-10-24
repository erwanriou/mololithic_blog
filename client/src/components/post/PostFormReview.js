import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PostInputFields from './PostInputFields'
import { sendPost } from '../../actions/postActions'

class PostFormReview extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    const { values } = this.props.form.postForm
    const newPost = {
      title: values.title,
      subject: values.subject,
      body: values.body,
      recipients: values.emails,
    }
    this.props.sendSurvey(
      newPost,
      this.props.history
    )
  }

  render() {
    const { onCancel, form } = this.props
    const { values } = this.props.form.postForm

    const reviewFields = PostInputFields.map(({ name, label }) => (
      <div key={name} className='field'>
        <label>{label}</label>
        <p>{values[name]}</p>
      </div>
    ))

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          {reviewFields}
          <a onClick={onCancel}>
            <i className="fas fa-angle-left"></i>
            <span>Back</span>
          </a>
          <button type='submit'>
            <span>Submit</span>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  form: state.form,
})

export default withRouter(connect(mapStateToProps, { sendPost })(PostFormReview))
