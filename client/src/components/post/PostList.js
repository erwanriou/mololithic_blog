import React, { Fragment } from "react"
import PostItem from "./PostItem"
import PostAdminItem from "./PostAdminItem"
import PostSearch from "./PostSearch"
import PostLandingItem from "./PostLandingItem"

class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ""
    }
    this.handleUpdateQuery = this.handleUpdateQuery.bind(this)
  }
  handleUpdateQuery(query) {
    this.setState({
      query: query
    })
  }
  render() {
    const { pathname, posts } = this.props
    const { query } = this.state
    let Postcontent
    switch (pathname) {
      case "/dashboard":
        Postcontent = (
          <div className="posts-list">
            {posts.map(post => (
              <PostAdminItem post={post} key={post._id} />
            ))}
          </div>
        )
        break
      case "/feed":
        Postcontent = (
          <Fragment>
            <PostSearch
              query={query}
              handleUpdateQuery={this.handleUpdateQuery}
            />
            <div className="posts-list">
              {posts
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date)
                })
                .filter(post =>
                  post.title.toLowerCase().includes(query.toLowerCase())
                )
                .map(post => (
                  <PostItem post={post} key={post._id} />
                ))}
            </div>
          </Fragment>
        )
        break
      case "/":
        Postcontent = (
          <div className="posts-list">
            {posts
              .sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
              })
              .slice(0, 3)
              .map(post => (
                <PostLandingItem post={post} key={post._id} />
              ))}
          </div>
        )
        break
      default:
    }

    return <Fragment>{Postcontent}</Fragment>
  }
}

export default PostList
