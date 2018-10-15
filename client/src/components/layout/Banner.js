import React from 'react'
import { Link } from 'react-router-dom'
import { Translate} from 'react-localize-redux'
import icon from '../../utils/images/logobbyogini2.png'
import blog from '../../utils/images/blog.png'
import school from '../../utils/images/school.png'
import shop from '../../utils/images/shop.png'


class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="opacity">
          <div className="container">
            <div className="title">
              <img src={icon} alt="logo bebeyogini"/>
              <h2>
                <Translate id="banner.quote" />
              </h2>
            </div>
            <div className="links">
              <Link to='/feed'>
              <h3>Blog</h3>
                <img src={blog} alt="icon of the blog"/>
                <Translate id="banner.link" />
              </Link>
              <span>
                <h3>School</h3>
                <img src={school} alt="icon of the blog"/>
                <Translate id="banner.soon" />
              </span>
              <span>
                <h3>Shop</h3>
                <img src={shop} alt="icon of the blog"/>
                <Translate id="banner.soon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Banner
