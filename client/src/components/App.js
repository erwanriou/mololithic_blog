import React, { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize } from "react-localize-redux"
import { Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"

// Import Actions
import { logout } from "./../actions/authActions"
import { fetchPosts } from "./../actions/postActions"

// Import Translations
import englishTranslations from "../translations/en.translations.json"
import frenchTranslations from "../translations/fr.translations.json"
import spanishTranslations from "../translations/es.translations.json"
// Auth
import PrivateRoute from "./common/PrivateRoute"
import PrivateRoleRoute from "./common/PrivateRoleRoute"
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
    this.props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Spanish", code: "es" }
      ],
      translation: englishTranslations,
      options: { renderToStaticMarkup }
    })
    this.props.addTranslationForLanguage(frenchTranslations, "fr")
    this.props.addTranslationForLanguage(spanishTranslations, "es")
  }
  componentDidMount() {
    this.props.fetchPosts()
  }
  componentDidUpdate(prevProps) {
    const { isActive } = this.props
    !isActive && this.props.logout()
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
