import React from "react"

class PostItem extends React.Component {
  render() {
    const { post } = this.props
    return (
      <div className="post">
        <img
          src={`https://s3.eu-west-3.amazonaws.com/bebeyogini/${post.imageUrl}`}
          alt={post.title}
        />
      </div>
    )
  }
}

export default PostItem
