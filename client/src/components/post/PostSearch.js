import React from "react"
import { connect } from "react-redux"

class PostSearch extends React.Component {
  render() {
    const { query, handleUpdateQuery } = this.props
    const { posts } = this.props.posts

    return (
      <div className="post-search">
        <div className="container">
          <input
            type="search"
            placeholder="search"
            onChange={event => handleUpdateQuery(event.target.value)}
            value={query}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(PostSearch)
