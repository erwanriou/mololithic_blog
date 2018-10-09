import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateUserRoute = ({ component: Component, auth, ...rest}) => (
  <Route
    {...rest}
    render = {props =>
      auth.isAuthenticated === true && auth.user.role === 'user'
      ? (<Component {...props} />)
      : (<Redirect to='/login' />)
    }
  />
)

PrivateUserRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateUserRoute)
