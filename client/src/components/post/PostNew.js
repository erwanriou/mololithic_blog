import React from "react"
import { reduxForm } from "redux-form"
import { connect } from "react-redux"

import PostForm from "./PostForm"
import PostFormReview from "./PostFormReview"

class PostNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: true,
      showFormReview: false,
      selectedOption: null
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  handleSelectChange(selectedOption) {
    this.setState({ selectedOption })
  }
  render() {
    const { showFormReview } = this.state
    const { posts } = this.props.posts
    let createPost

    showFormReview
      ? (createPost = (
          <div className="create-post-form">
            <h2>Review your post</h2>
            <PostFormReview
              onCancel={() => {
                this.setState({ showFormReview: false })
              }}
            />
          </div>
        ))
      : (createPost = (
          <div className="create-post-form">
            <h2>Create a Post</h2>
            <PostForm
              posts={posts}
              handleSelectChange={this.handleSelectChange}
              onPostSubmit={() => {
                this.setState({ showFormReview: true })
              }}
            />
          </div>
        ))

    return (
      <div className="layout">
        <div className="opacity">
          <div className="container">{createPost}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

PostNew = connect(mapStateToProps)(PostNew)
export default reduxForm({ form: "postForm" })(PostNew)
