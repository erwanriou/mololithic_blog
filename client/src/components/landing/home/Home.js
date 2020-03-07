import React, { Fragment } from "react"
import { connect } from "react-redux"
import { getTranslate } from "react-localize-redux"

// IMPORT ACTIONS
import { fetchPosts } from "@actions/postActions"

// IMPORT COMPONENTS
import HomeBanner from "./HomeBanner"
import HomeLinks from "./HomeLinks"
import HomeHeader from "./HomeHeader"
import HomePosts from "./HomePosts"

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    const { translate, posts } = this.props
    return (
      <Fragment>
        <HomeBanner />
        <div className="landing layout">
          <div className="opacity">
            <div className="container">
              <HomeLinks translate={translate} />
              <HomeHeader />
              <HomePosts
                posts={posts}
                translate={translate}
                pathname={this.props.location.pathname}
              />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.localize),
  posts: state.posts
})

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Home)
