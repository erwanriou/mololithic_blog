import React from 'react'
import { Link } from 'react-router-dom'
import { Translate} from 'react-localize-redux'

import icon from '../../utils/images/logobbyogini2.png'
import blog from '../../utils/images/blog.png'
import school from '../../utils/images/school.png'
import shop from '../../utils/images/shop.png'

class Landing extends React.Component {
  render() {
    return (
      <div className="landing layout">
        <div className="opacity">
          <div className="container">
            <div className="banner">
              <img src={icon} alt="logo bebeyogini"/>
              <div className="title">
                <h1><Translate id="landing.title" /></h1>
                <h2><Translate id="landing.quote" /></h2>
                <div className="subtitle">
                  <div className="box">
                    <h2><Translate id="landing.level" /></h2>
                    <p><Translate id="landing.leveltext" /></p>
                  </div>
                  <div className="box">
                    <h2><Translate id="landing.style" /></h2>
                    <p><Translate id="landing.styletext" /></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="links">
              <Link to='/feed'>
                <h3><Translate id="landing.blog" /></h3>
                <img src={blog} alt="icon of the blog"/>
                <p><Translate id="landing.link" /></p>
              </Link>
              <span>
                <h3><Translate id="landing.school" /></h3>
                <img src={school} alt="icon of the blog"/>
                <p><Translate id="landing.soon" /></p>
              </span>
              <span>
                <h3><Translate id="landing.shop" /></h3>
                <img src={shop} alt="icon of the blog"/>
                <p><Translate id="landing.soon" /></p>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
