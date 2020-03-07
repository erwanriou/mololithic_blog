import React, { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize } from "react-localize-redux"
import { Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"

// Import Actions
import { logout } from "@actions/authActions"
import { fetchPosts } from "@actions/postActions"

// Import Translations
import EN from "../translations/en.translations.json"
import ES from "../translations/es.translations.json"

// IMPORT UTILS
import isEmpty from "@utils/isEmpty"

// Auth
import PrivateRoute from "@common/PrivateRoute"
import PrivateRoleRoute from "@common/PrivateRoleRoute"
// Components
import Nav from "./layout/Nav"
import Landing from "./landing/Landing"
import Privacy from "./layout/Privacy"
import Footer from "./layout/Footer"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Dashboard from "./dashboard/Dashboard"
import PostNew from "./post/PostNew"
import Posts from "./post/Posts"
import Post from "./post/Post"

// Styling
import "../styles/reset.css"
import "../styles/global.css"
import "../styles/nav.css"
import "../styles/dashboard.css"
import "../styles/landing.css"
import "../styles/posts.css"
import "../styles/post-create.css"
import "../styles/post.css"
import "../styles/footer.css"
import "../styles/auth.css"
import "../styles/responsive.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    const { initialize, addTranslationForLanguage } = this.props
    initialize({
      languages: [
        { name: "Spanish", code: "es" },
        { name: "English", code: "en" }
      ],
      translation: ES,
      options: { renderToStaticMarkup }
    })
    this.state = {
      pathname: "",
      origin: window.location.pathname + window.location.search
    }
    addTranslationForLanguage(EN, "en")
  }
  componentDidMount() {
    this.props.fetchPosts()
    // SETUP TITLE PAGE VALUE
    this.setState({
      pathname: window.location.pathname
    })
    // STORE ORIGIN URL
    isEmpty(window.location.pathname.match(/dashboard/)) &&
      localStorage.setItem("origin", this.state.origin)
  }
  componentDidUpdate(prevProps, prevState) {
    const { isActive, location } = this.props
    !isActive && this.props.logout()

    // ENSURE SCROLL POSITION IS RESET WHEN CHANGE ROUTER PAGE
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
    // DATALAYER UPDATE DATA
    this.state.pathname !== window.location.pathname &&
      this.setState({
        pathname: window.location.pathname
      })
    this.state.pathname !== prevState.pathname &&
      setTimeout(() => {
        window.dataLayer.push({
          event: "Pageview",
          origin: localStorage.getItem("origin"),
          page: window.location.pathname + window.location.search,
          url: this.state.pathname,
          host: window.location.hostname,
          title: document.title
        })
      }, 300)
  }
  render() {
    return (
      <Fragment>
        <Nav
          setActiveLanguage={this.props.setActiveLanguage}
          languages={this.props.languages}
        />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/privacy-policy" component={Privacy} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/feed" component={Posts} />
          <Route exact path="/feed/:posttitle" component={Post} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoleRoute
            exact
            roles="ROLE_ADMIN"
            path="/dashboard/new-post"
            component={PostNew}
          />
          <PrivateRoleRoute
            exact
            roles="ROLE_ADMIN"
            path="/dashboard/edit-post/:postid"
            component={PostNew}
          />
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isActive: state.isActive
})

export default withLocalize(
  withRouter(
    connect(
      mapStateToProps,
      { logout, fetchPosts }
    )(App)
  )
)
