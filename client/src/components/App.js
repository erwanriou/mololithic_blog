import React , { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

// Auth
import PrivateUserRoute from './common/PrivateUserRoute'
import PrivateAdminRoute from './common/PrivateAdminRoute'

// Components
import Nav from './layout/Nav'
import Landing from './layout/Landing'
import Footer from './layout/Footer'
import Login from './auth/Login'
import DashBoardUser from './dashboard/DashBoardUser'
import DashBoardAdmin from './dashboard/DashBoardAdmin'

// Styling
import '../styles/reset.css'
import '../styles/global.css'
import '../styles/nav.css'

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/login' component={Login}/>
          <PrivateUserRoute exact path='/dashboard' component={DashBoardUser}/>
          <PrivateAdminRoute exact path='/dashboard-admin' component={DashBoardAdmin}/>
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default App
