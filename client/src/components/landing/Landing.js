import React, { Fragment } from "react"

import LandingBanner from "./LandingBanner"
import LandingLinks from "./LandingLinks"
import LandingHeader from "./LandingHeader"
import LandingPosts from "./LandingPosts"

class Landing extends React.Component {
  render() {
    return (
      <Fragment>
        <LandingBanner />
        <div className="landing layout">
          <div className="opacity">
            <div className="container">
              <LandingLinks />
              <LandingHeader />
              <LandingPosts pathname={this.props.location.pathname} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Landing
