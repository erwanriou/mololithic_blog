import React from "react"
import { reduxForm } from "redux-form"

import PostForm from "./PostForm"
import PostFormReview from "./PostFormReview"

class PostNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: true,
      showFormReview: false
    }
  }
  render() {
    const { showFormReview } = this.state
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

export default reduxForm({ form: "postForm" })(PostNew)
