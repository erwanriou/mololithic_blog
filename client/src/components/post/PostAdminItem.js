import React from "react"

class PostAdminItem extends React.Component {
  render() {
    const { post } = this.props
    return (
      <div className="post">
        <h3>{post.title}</h3>
      </div>
    )
  }
}

export default PostAdminItem
