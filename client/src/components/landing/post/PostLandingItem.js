import React from "react"
import Timestamp from "react-timestamp"
import { Link } from "react-router-dom"

class PostLandingItem extends React.Component {
  render() {
    const { post, translate } = this.props
    const seoUrl = post.title
      .toLowerCase()
      .split(" ")
      .join("-")
    return (
      <Link
        to={`/${translate("meta.blog-post.fix-url")}/${seoUrl}`}
        className="post-landing-item"
      >
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
            <p>
              <Timestamp
                className="request-item-timestamp"
                relative
                date={post.date}
                autoUpdate
              />
            </p>
          </div>
        </div>
      </Link>
    )
  }
}

export default PostLandingItem
