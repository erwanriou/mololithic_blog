import React from "react"
import { connect } from "react-redux"

import isEmpty from "@utils/isEmpty"
import Spinner from "../common/Spinner"
import PostList from "./PostList"

class Posts extends React.Component {
  render() {
    let Postcontent
    const { posts, loading } = this.props.posts

    isEmpty(posts) || loading
      ? (Postcontent = <Spinner />)
      : (Postcontent = (
          <PostList
            posts={posts}
            pathname={this.props.location.pathname}
            loading={loading}
          />
        ))
    return <div className="posts">{Postcontent}</div>
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(Posts)
