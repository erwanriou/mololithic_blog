import React, { Fragment } from "react"
import PostItem from "./PostItem"
import PostAdminItem from "./PostAdminItem"
import PostLandingItem from "./PostLandingItem"

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
        Postcontent = posts
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })
          .map(post => <PostItem post={post} key={post._id} />)
        break
      case "/":
        Postcontent = posts
          .sort((a, b) => {
            return new Date(a.date) - new Date(b.date)
          })
          .slice(0, 3)
          .map(post => <PostLandingItem post={post} key={post._id} />)
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
