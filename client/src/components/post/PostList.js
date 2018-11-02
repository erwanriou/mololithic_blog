import React, { Fragment } from "react"
import PostItem from "./PostItem"
import PostAdminItem from "./PostAdminItem"
import PostSearch from "./PostSearch"
import PostLandingItem from "./PostLandingItem"

class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
      results: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    e.preventDefault()
    this.setState({ searchQuery: e.target.value })
  }
  render() {
    const { pathname, posts } = this.props
    const { searchQuery, results } = this.state
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
              searchQuery={searchQuery}
              handleChange={this.handleChange}
            />
            <div className="posts-list">
              {posts
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date)
                })
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
