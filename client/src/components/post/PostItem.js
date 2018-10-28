import React from "react"
import { Link } from "react-router-dom"

class PostItem extends React.Component {
  render() {
    const { post } = this.props
    const seoUrl = post.title
      .toLowerCase()
      .split(" ")
      .join("-")
    return (
      <Link to={`/feed/${seoUrl}`} className="post-item">
        <img
          src={`https://s3.eu-west-3.amazonaws.com/bebeyogini/${post.imageUrl}`}
          alt={post.title}
        />
        <div className="absolute">
          <div className="title">
            <h2>{post.title}</h2>
            <h3>{post.asana}</h3>
          </div>
          <div className="date">
            <p>{post.date}</p>
          </div>
        </div>
      </Link>
    )
  }
}

export default PostItem
