import React from 'react'
import { Translate } from 'react-localize-redux'

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="filter">
          <h1><Translate id="landing.title" /></h1>
        </div>
      </div>
    )
  }
}
 export default Banner
