import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'

import PostForm from './PostForm'
import PostFormReview from './PostFormReview'

class PostNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: true,
      showFormReview: false,
    }
  }
  render() {
    const { showForm, showFormReview } = this.state
    let createPost

    showFormReview
      ? createPost = (
          <div className='createpostform'>
            <h2>Review your survey before sending it!</h2>
            <PostFormReview onCancel={() => {
              this.setState({ showFormReview: false })
            }}/>
          </div>
        )
      : createPost = (
          <div className='createpostform'>
            <h2>Fill out the Survey form to create your email campaign!</h2>
            <PostForm onPostSubmit={() => {
              this.setState({ showFormReview: true })
            }}/>
          </div>
        )

    return (
      <main>
        <div className="container">
          {createPost}
        </div>
      </main>
    )
  }
}

export default reduxForm({ form: 'postForm' })(PostNew)
