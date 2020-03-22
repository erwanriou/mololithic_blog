import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Translate, withLocalize } from "react-localize-redux"

import { logout } from "@actions/authActions"
import icon from "@utils/images/logobbyogini.png"
import Spinner from "@common/Spinner"

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
    this.handleHover = this.handleHover.bind(this)
  }
  handleHover(hover) {
    this.setState({ hover })
  }
  handleLogout(e) {
    e.preventDefault()
    this.props.logout()
  }
  renderNavYogaOptions() {
    const { translate } = this.props
    return (
      <div className="hover-box-wrapper">
        <div className="hover-box">
          <div className="hover-content">
            <Link className="noselect" to={translate("meta.yoga-mindful.url")}>
              <Translate id="nav.yoga-mindful" />
            </Link>
          </div>
          <div className="hover-content">
            <Link
              className="noselect"
              to={translate("meta.yoga-therapeutic.url")}
            >
              <Translate id="nav.yoga-therapeutic" />
            </Link>
          </div>
          <div className="hover-content">
            <Link className="noselect" to={translate("meta.yoga-company.url")}>
              <Translate id="nav.yoga-company" />
            </Link>
          </div>
          <div className="hover-content">
            <Link className="noselect" to={translate("meta.yoga-hotel.url")}>
              <Translate id="nav.yoga-hotel" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { hover } = this.state
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
              <Link
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                className="noselect"
                to={translate("meta.yoga.url")}
              >
                <Translate id="nav.yoga" />
                {hover && this.renderNavYogaOptions()}
              </Link>
              <Link className="noselect" to={translate("meta.psychology.url")}>
                <Translate id="nav.psychology" />
              </Link>
              <Link className="noselect" to={translate("meta.about.url")}>
                <Translate id="nav.about" />
              </Link>
              <Link className="noselect" to={translate("meta.contact.url")}>
                <Translate id="nav.contact" />
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
