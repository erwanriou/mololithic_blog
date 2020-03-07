import React, { Fragment } from "react"
import { connect } from "react-redux"

import isEmpty from "@utils/isEmpty"
import Spinner from "@common/Spinner"
import PostList from "../post/PostList"

class LandingPosts extends React.Component {
  render() {
    let Postcontent
    const { posts, loading } = this.props.posts

    isEmpty(posts) || loading
      ? (Postcontent = <Spinner />)
      : (Postcontent = (
          <PostList
            posts={posts}
            pathname={this.props.pathname}
            loading={loading}
          />
        ))
    return <Fragment>{Postcontent}</Fragment>
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(LandingPosts)
