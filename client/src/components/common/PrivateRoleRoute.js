import React from "react"
import { Route, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const PrivateRoleRoute = ({ component: Component, auth, roles, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && auth.user.authorities.includes(roles) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

PrivateRoleRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoleRoute)
