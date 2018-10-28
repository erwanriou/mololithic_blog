import React, { Fragment } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import PostInputFields from "./PostInputFields"
import { sendPost } from "../../actions/postActions"

class PostFormReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }
  onFileChange(event) {
    this.setState({ file: event.target.files[0] })
  }
  handleSubmit(e) {
    e.preventDefault()
    const { values } = this.props.form.postForm
    this.props.sendPost(values, this.state.file, this.props.history)
  }

  render() {
    const { onCancel, form } = this.props
    const { values } = this.props.form.postForm

    const reviewFields = PostInputFields.map(({ name, label }) => (
      <div key={name} className="field">
        <label>{label}</label>
        <p>{values[name]}</p>
      </div>
    ))

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          {reviewFields}
          <h5>Add An Image</h5>
          <input type="file" accept="image/*" onChange={this.onFileChange} />
          <span onClick={onCancel}>
            <i className="fas fa-angle-left" />
            <span>Back</span>
          </span>
          <button type="submit">
            <span>Submit</span>
            <i className="fas fa-paper-plane" />
          </button>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

export default withRouter(
  connect(
    mapStateToProps,
    { sendPost }
  )(PostFormReview)
)
