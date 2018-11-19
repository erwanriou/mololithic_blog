import React, { Fragment } from "react"
import { connect } from "react-redux"

class PostSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    const { toggle } = this.state
    const { query, handleUpdateQuery } = this.props

    return (
      <Fragment>
        <div
          className="post-search-icon"
          style={{
            display: !toggle ? "flex" : "none"
          }}
          onClick={this.handleToggle}
        >
          <p>Filter Options</p>
          <i className="fas fa-filter" />
        </div>
        <div
          className="post-search-tool"
          style={{
            top: toggle ? "3rem" : "-3rem"
          }}
        >
          <div className="container search">
            <div className="search">
              <input
                type="search"
                placeholder="Filter Posts"
                onChange={event => handleUpdateQuery(event.target.value)}
                value={query}
              />
              <div className="close">
                <button onClick={this.handleToggle}>X</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(PostSearch)
