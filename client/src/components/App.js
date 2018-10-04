import React , { Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// Components
import Landing from './layout/Landing'

// Styling
import '../styles/reset.css'
import '../styles/global.css'

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/' component={Landing}/>
        </Switch>
      </Fragment>
    )
  }
}

export default App
