import React from "react"
import { Translate } from "react-localize-redux"
import { Link } from "react-router-dom"

import blog from "@utils/images/blog.png"
import school from "@utils/images/school.png"
import shop from "@utils/images/shop.png"

class HomeLinks extends React.Component {
  render() {
    const { translate } = this.props
    return (
      <div className="links">
        <Link to={translate("meta.blog.url")}>
          <h3>
            <Translate id="landing.blog" />
          </h3>
          <img src={blog} alt="icon of the blog" />
          <p>
            <Translate id="landing.link" />
          </p>
        </Link>
        <span>
          <h3>
            <Translate id="landing.school" />
          </h3>
          <img src={school} alt="icon of the blog" />
          <p>
            <Translate id="landing.soon" />
          </p>
        </span>
        <span>
          <h3>
            <Translate id="landing.shop" />
          </h3>
          <img src={shop} alt="icon of the blog" />
          <p>
            <Translate id="landing.soon" />
          </p>
        </span>
      </div>
    )
  }
}

export default HomeLinks
