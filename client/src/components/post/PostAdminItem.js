import React from "react"
import { Link } from "react-router-dom"

class PostAdminItem extends React.Component {
  render() {
    const { post } = this.props
    return (
      <div className="post-admin-item">
        <div className="post-admin-image">
          <img
            src={`https://s3.eu-west-3.amazonaws.com/bebeyogini/${
              post.imageUrl
            }`}
            alt={post.title}
          />
        </div>
        <h3>{post.title}</h3>
        <Link to={`/dashboard/edit-post/${post._id}`}>Edit post</Link>
      </div>
    )
  }
}

export default PostAdminItem
