import React, { Fragment } from "react"

import isEmpty from "@utils/isEmpty"
import Spinner from "@common/Spinner"
import PostList from "../post/PostList"

class HomePosts extends React.Component {
  render() {
    let Postcontent
    const { translate } = this.props
    const { posts, loading } = this.props.posts

    isEmpty(posts) || loading
      ? (Postcontent = <Spinner />)
      : (Postcontent = (
          <PostList
            translate={translate}
            posts={posts}
            pathname={this.props.pathname}
            loading={loading}
          />
        ))
    return <Fragment>{Postcontent}</Fragment>
  }
}

export default HomePosts
