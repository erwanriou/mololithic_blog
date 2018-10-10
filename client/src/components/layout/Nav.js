import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { logout } from '../../actions/authActions'
import icon from '../../utils/images/logobbyogini.png'

class Nav extends React.Component {
  handleLogout(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const  { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <div className='usermenu'>
        <Link
          to='/dashboard'>
          Dashboard
        </Link>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: '25px', marginRight: '5px'}}
          title='You must have a Gravatar connect to you email to display an image'
        />
        <Link
          to='/'
          onClick={this.handleLogout.bind(this)}>
          Logout
        </Link>
      </div>
    )

    const guestLinks = (
      <div className='usermenu'>
        <Link to='/register'>Sign Up</Link>
        <Link to='/login'>Login</Link>
      </div>
    )

    return (
      <div className="nav">
        <div className="container">
          <div className="menu">
            <div className="brand">
              <Link to='/'><img src={icon} alt="Icon logo"/></Link>
              <div className="title">
                <h2>Bebe Yogini</h2>
                <h4>The yoga blog for begginers</h4>
              </div>
            </div>
            { isAuthenticated
              ? authLinks
              : guestLinks }
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
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default withRouter(connect(mapStateToProps, { logout })(Nav))
