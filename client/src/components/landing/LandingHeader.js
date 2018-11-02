import React from "react"
import { Translate } from "react-localize-redux"

class LandingHeader extends React.Component {
  render() {
    return (
      <div className="header">
        <i className="fas fa-ellipsis-h" />
        <div className="title">
          <h1>
            <Translate id="landing.quote" />
          </h1>
          <h2>
            <Translate id="landing.subtitle" />
          </h2>
          <div className="subtitle">
            <div className="box">
              <h2>
                <Translate id="landing.level" />
              </h2>
              <p>
                <Translate id="landing.leveltext" />
              </p>
            </div>
            <div className="box">
              <h2>
                <Translate id="landing.style" />
              </h2>
              <p>
                <Translate id="landing.styletext" />
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingHeader
