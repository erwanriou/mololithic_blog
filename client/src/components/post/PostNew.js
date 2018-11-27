import React from "react"
import Select from "react-select"
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
      titleField: undefined,
      asanaField: undefined,
      bodyField: undefined,
      selectedOption: null,
      file: null,
      errors: {}
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleQueryInput = this.handleQueryInput.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.handleResetForm = this.handleResetForm.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }
  componentDidMount() {
    const { postid } = this.props.match.params
    postid && this.props.fetchEditPost(postid)
    document.addEventListener("keydown", this.handleKey, false)
  }
  componentDidUpdate() {
    isEmpty(this.state.titleField) &&
      this.props.post.title &&
      this.setState({
        titleField: this.props.post.title,
        asanaField: this.props.post.asana,
        bodyField: this.props.post.body
      })
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey, false)
  }
  handleKey(event) {
    if (event.keyCode === 27) {
      this.handleResetForm()
      this.props.history.push("/dashboard")
    }
  }
  onFileChange(event) {
    this.setState({ file: event.target.files[0] })
  }
  handleSelectChange(selectedOption) {
    this.setState({ selectedOption })
  }
  handleResetForm() {
    this.setState({ ...this.state })
  }
  handleQueryInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const newPost = {
      title: this.state.titleField,
      asana: this.state.asanaField,
      body: this.state.bodyField
    }
    this.props.sendPost(newPost, this.state.file, this.props.history)
  }
  render() {
    const { postid } = this.props.match.params
    const { titleField, asanaField, bodyField, errors } = this.state
    return (
      <div className="layout-create-post">
        <div className="opacity">
          <div className="container">
            <div className="create-post-form">
              {postid ? <h2>Edit a Post</h2> : <h2>Create a Post</h2>}
              <form onSubmit={this.handleSubmit}>
                <PostField
                  textarea={false}
                  type="text"
                  label="The title of your post"
                  name="titleField"
                  value={titleField || ""}
                  onChange={this.handleQueryInput}
                  error={errors.status}
                />
                <PostField
                  textarea={false}
                  type="text"
                  label="The Name of the asana"
                  value={asanaField || ""}
                  onChange={this.handleQueryInput}
                  name="asanaField"
                />
                <PostField
                  textarea={true}
                  type="text"
                  label="The content of your post"
                  value={bodyField || ""}
                  onChange={this.handleQueryInput}
                  name="bodyField"
                />
                <div className="field">
                  <Translate>
                    {({ translate }) => (
                      <Select
                        className="select"
                        placeholder={translate("to.translate")}
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
  post: state.posts.post
})

export default connect(
  mapStateToProps,
  { fetchEditPost, sendPost }
)(PostNew)
