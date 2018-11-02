import React from "react"
import { connect } from "react-redux"

import isEmpty from "../../utils/isEmpty"
import Spinner from "../common/Spinner"

class PostSearch extends React.Component {
  render() {
    const { searchQuery } = this.props
    const { posts } = this.props.posts

    return (
      <div className="post-search">
        <div className="container">
          <input
            type="text"
            placeholder="search"
            onChange={this.props.handleChange}
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
