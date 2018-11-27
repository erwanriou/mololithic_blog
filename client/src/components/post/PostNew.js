import React from "react"
import Select from "react-select"
import { reduxForm, Field } from "redux-form"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Translate } from "react-localize-redux"

//import actions
import { fetchEditPost, sendPost } from "../../actions/postActions"

import PostField from "./PostField"
import isEmpty from "../../utils/isEmpty"
import Spinner from "../common/Spinner"

class PostNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      file: null
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }
  componentDidMount() {
    const { postid } = this.props.match.params
    this.props.fetchEditPost(postid)
  }
  onFileChange(event) {
    this.setState({ file: event.target.files[0] })
  }

  handleSelectChange(selectedOption) {
    this.setState({ selectedOption })
  }
  handleSubmit(e) {
    e.preventDefault()
    const { values } = this.props.form.postForm
    this.props.sendPost(values, this.state.file, this.props.history)
  }
  render() {
    const { postid } = this.props.match.params
    const { posts } = this.props
    const { onCancel, form } = this.props
    return (
      <div className="layout">
        <div className="opacity">
          <div className="container">
            <div className="create-post-form">
              {postid ? <h2>Edit a Post</h2> : <h2>Create a Post</h2>}
              <form onSubmit={this.handleSubmit}>
                <Field
                  textarea={false}
                  component={PostField}
                  type="text"
                  label="The title of your post"
                  name="title"
                  values={this.props.posts.post.title}
                />
                <Field
                  textarea={false}
                  component={PostField}
                  type="text"
                  label="The Name of the asana"
                  name="asana"
                />
                <Field
                  textarea={true}
                  component={PostField}
                  type="text"
                  label="The content of your post"
                  name="body"
                />
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
                        onChange={this.handleSelectChange}
                      />
                    )}
                  </Translate>
                </div>
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
                  <Link to="/dashboard">Cancel</Link>
                  <button type="submit">
                    <span>Submit</span>
                    <i className="fas fa-paper-plane" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  form: state.form
})

PostNew = connect(
  mapStateToProps,
  { fetchEditPost, sendPost }
)(PostNew)
export default reduxForm({ form: "postForm" })(PostNew)
