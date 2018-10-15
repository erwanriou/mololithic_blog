import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../../utils/images/logobbyogini2.png'

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="opacity">
          <div className="container">
            <div className="title">
              <img src={icon} alt="logo bebeyogini"/>
              <h2>Inhale the future...Exhale the past... </h2>
            </div>
            <Link to='/feed'>Discover the Blog!</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Banner
