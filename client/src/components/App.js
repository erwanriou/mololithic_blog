import React , { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

// Auth
import PrivateRoute from './common/PrivateRoute'

// Components
import Nav from './layout/Nav'
import Landing from './layout/Landing'
import Footer from './layout/Footer'
import Login from './auth/Login'
import DashBoard from './dashboard/DashBoard'


// Styling
import '../styles/reset.css'
import '../styles/global.css'
import '../styles/nav.css'
import '../styles/auth.css'

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/login' component={Login}/>
          <PrivateRoute exact path='/dashboard' component={DashBoard}/>
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default App
