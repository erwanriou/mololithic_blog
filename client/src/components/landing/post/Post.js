import React from "react"
import { connect } from "react-redux"

import { fetchPost } from "@actions/postActions"

class Post extends React.Component {
  componentDidMount() {
    const { title } = this.props.match.params
    this.props.fetchPost(title)
  }
  render() {
    const { post } = this.props.posts
    return (
      <div className="post">
        <div className="opacity">
          <div className="container post-content">
            <div className="post-image">
              <img
                src={`https://s3.eu-west-3.amazonaws.com/bebeyogini/${post.imageUrl}`}
                alt={post.title}
              />
            </div>
            <div className="content">
              <h1>{post.title}</h1>
              <h2>{post.asana}</h2>
              <p>{post.body}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(
  mapStateToProps,
  { fetchPost }
)(Post)
