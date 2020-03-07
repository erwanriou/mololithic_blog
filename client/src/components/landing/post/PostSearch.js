import React, { Fragment } from "react"
import { connect } from "react-redux"

class PostSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKey, false)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey, false)
  }
  handleKey(event) {
    if (event.keyCode === 27) {
      this.setState({
        toggle: false
      })
    }
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
                <span className="noselect" onClick={this.handleToggle}>
                  X
                </span>
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
