import React from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

import isEmpty from "../../utils/isEmpty"
import Spinner from "../common/Spinner"

class DashboardAdmin extends React.Component {
  render() {
    const { posts, loading } = this.props.posts
    let postContent

    isEmpty(posts) || loading
      ? (postContent = <Spinner />)
      : (postContent = (
          <div className="admin-post-list">
            {posts.map(post => (
              <h3 key={post._id}>{post.title}</h3>
            ))}
          </div>
        ))

    return (
      <main>
        <h2>List of created posts</h2>
        {postContent}
        <h2>New Post</h2>
        <Link to="/dashboard/new-post">Create a new post</Link>
      </main>
    )
  }
}
const mapStateToProps = state => ({
  posts: state.posts
})

export default withRouter(connect(mapStateToProps)(DashboardAdmin))
