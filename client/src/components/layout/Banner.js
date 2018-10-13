import React from 'react'

import icon from '../../utils/images/logobbyogini2.png'

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="opacity">
          <div className="container">
            <img src={icon} alt="logo bebeyogini"/>
            <h1>Bebe Yogini</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Banner
