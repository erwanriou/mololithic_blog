import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Translate, withLocalize } from "react-localize-redux"

import { logout } from "@actions/authActions"
import icon from "@utils/images/logobbyogini.png"
import Spinner from "@common/Spinner"

class Nav extends React.Component {
  handleLogout(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const { translate } = this.props
    const { isAuthenticated, user, loading } = this.props.auth
    let content

    !isAuthenticated
      ? loading === true
        ? (content = <Spinner />)
        : (content = (
            <div className="usermenu">
              <Link className="noselect" to="/register">
                <Translate id="nav.signup" />
              </Link>
              <Link className="noselect" to="/login">
                <Translate id="nav.login" />
              </Link>
            </div>
          ))
      : loading === true
      ? (content = <Spinner />)
      : (content = (
          <div className="usermenu">
            <Link className="noselect" to="/dashboard/main">
              <Translate id="nav.dashboard" />
            </Link>
            <img
              className="noselect"
              src={user.avatar}
              alt={user.name}
              title="You must have a Gravatar connect to you email to display an image"
            />
            <Link
              className="noselect"
              to="/"
              onClick={this.handleLogout.bind(this)}
            >
              <Translate id="nav.logout" />
            </Link>
          </div>
        ))

    return (
      <div className="nav">
        <div className="container">
          <div className="menu">
            <Link className="noselect brand" to="/">
              <img src={icon} alt="Icon logo" />
            </Link>
            <div className="mainmenu">
              <Link className="noselect" to="/">
                <Translate id="nav.home" />
              </Link>
              <Link className="noselect" to={translate("meta.blog.url")}>
                <Translate id="nav.blog" />
              </Link>
              <Link className="noselect" to={translate("meta.about.url")}>
                <Translate id="nav.about" />
              </Link>
              <Link className="noselect" to="/yoga">
                YOGA
              </Link>
              <Link className="noselect" to="/psychology">
                <Translate id="nav.psychology" />
              </Link>
            </div>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default withLocalize(
  withRouter(
    connect(
      mapStateToProps,
      { logout }
    )(Nav)
  )
)
