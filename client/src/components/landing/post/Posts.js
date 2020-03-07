import React from "react"
import { connect } from "react-redux"
import { getTranslate } from "react-localize-redux"

// IMPORT ACTIONS
import { fetchPosts } from "@actions/postActions"

import isEmpty from "@utils/isEmpty"
import Spinner from "@common/Spinner"
import PostList from "./PostList"

class Posts extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    let Postcontent
    const { translate } = this.props
    const { posts, loading } = this.props.posts

    isEmpty(posts) || loading
      ? (Postcontent = <Spinner />)
      : (Postcontent = (
          <PostList
            posts={posts}
            pathname={this.props.location.pathname}
            loading={loading}
            translate={translate}
          />
        ))
    return <div className="posts">{Postcontent}</div>
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.localize),
  posts: state.posts
})

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts)
