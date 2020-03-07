import React, { Suspense, lazy, Fragment } from "react"
import { connect } from "react-redux"
import { Switch, withRouter } from "react-router-dom"

// IMPORT ROUTES
import { Routes } from "../Routes"

// IMPORT COMPONENTS
import Loading from "../common/Loader"

// LOADED COMPONENTS
const PrivateRoleRoute = lazy(() => import("../common/PrivateRoleRoute"))
const PrivateRoute = lazy(() => import("../common/PrivateRoute"))

class Dashboard extends React.Component {
  render() {
    return (
      <Fragment>
        <Suspense fallback={<Loading />}>
          <Switch>
            {Routes.dashboard.global.map((page, index) => (
              <PrivateRoute
                exact={page.exact}
                key={index}
                path={page.path}
                component={page.component}
              />
            ))}
            {Routes.dashboard.user.map((page, index) => (
              <PrivateRoleRoute
                exact
                key={index}
                path={page.path}
                roles={page.roles}
                component={page.component}
              />
            ))}
            {Routes.dashboard.admin.map((page, index) => (
              <PrivateRoleRoute
                exact
                key={index}
                path={page.path}
                roles={page.roles}
                component={page.component}
              />
            ))}
          </Switch>
        </Suspense>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps)(Dashboard))
