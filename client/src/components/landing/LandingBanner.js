import React from "react"
import { Translate } from "react-localize-redux"

import logo from "../../utils/images/logobbyogini3.png"

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="filter">
          <div className="container">
            <div className="title">
              <img src={logo} alt="The logo of bebeyogini" />
              <h1>
                <Translate id="banner.title" />
              </h1>
              <h2>
                <Translate id="banner.subtitle" />
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Banner
