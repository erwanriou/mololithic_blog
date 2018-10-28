import React, { Fragment } from "react"
import PostItem from "./PostItem"
import PostAdminItem from "./PostAdminItem"

class PostList extends React.Component {
  render() {
    let Postcontent
    const { pathname, posts } = this.props

    switch (pathname) {
      case "/dashboard":
        Postcontent = posts.map(post => (
          <PostAdminItem post={post} key={post._id} />
        ))
        break
      case "/feed":
        Postcontent = posts.map(post => <PostItem post={post} key={post._id} />)
        break
      default:
    }

    return (
      <Fragment>
        <div className="posts-list">{Postcontent}</div>
      </Fragment>
    )
  }
}

export default PostList
