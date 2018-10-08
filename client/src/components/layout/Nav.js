import React from 'react'
import { Link } from 'react-router-dom'

import icon from '../../utils/images/logobbyogini.png'

class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="container">
          <div className="menu">
            <div className="title">
              <img src={icon} alt="Icon logo"/>
              <h2>BBYogini</h2>
            </div>
            <div className="auth">
              <Link to='/Login'>Login</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav
