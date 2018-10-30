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
  handleRender() {}
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
          <div className="review">
            <div className="send-image">
              <label className="fileContainer">
                <i className="fas fa-cloud-upload-alt" />
                Add An Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={this.onFileChange}
                  className="inputfile"
                />
              </label>
            </div>
            <div className="actions">
              <div className="back" onClick={onCancel}>
                <i className="fas fa-angle-left" />
                <span>Back</span>
              </div>
              <button type="submit">
                <span>Submit</span>
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </div>
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
