import React, { lazy } from "react"
import { Route, Switch } from "react-router"

// IMPORT ROUTES
import { Routes } from "./Routes"

const Home = lazy(() => import("./landing/home/Home"))
const PrivateRoute = lazy(() => import("@common/PrivateRoute"))
const NotFound = lazy(() => import("@common/NotFound"))
const Dashboard = lazy(() => import("./dashboard/Dashboard"))

const Router = ({ router, translate }) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {Routes.auth.map((page, index) => (
        <Route exact key={index} path={page.path} component={page.component} />
      ))}
      {Routes.landingPages.map((page, index) => (
        <Route
          exact
          key={index}
          path={translate(page.path)}
          component={page.component}
        />
      ))}
      {Routes.infoPages.map((page, index) => (
        <Route
          exact
          key={index}
          path={translate(page.path)}
          omponent={page.component}
        />
      ))}
      <Route exact path="/not-found" component={NotFound} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      {!router.pathname.match(/dashboard/) && (
        <Route exact component={NotFound} />
      )}
    </Switch>
  )
}

export default Router
