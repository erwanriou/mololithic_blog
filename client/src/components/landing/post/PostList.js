import React, { Fragment } from "react"

// IMPORT COMPONENTS
import PostSearch from "./PostSearch"
import PostItem from "./PostItem"
import PostLandingItem from "./PostLandingItem"
import PostAdminItem from "../../dashboard/admin/PostAdminItem"

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
    const { pathname, posts, handleDeletePost, translate } = this.props
    const { query } = this.state

    let Postcontent
    switch (pathname) {
      case "/dashboard/main":
        Postcontent = (
          <div className="posts-list">
            {posts.map(post => (
              <PostAdminItem
                handleDeletePost={handleDeletePost}
                post={post}
                key={post._id}
              />
            ))}
          </div>
        )
        break
      case translate("meta.blog.url"):
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
                  <PostItem post={post} key={post._id} translate={translate} />
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
                return new Date(b.date) - new Date(a.date)
              })
              .slice(0, 3)
              .map(post => (
                <PostLandingItem
                  post={post}
                  key={post._id}
                  translate={translate}
                />
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
