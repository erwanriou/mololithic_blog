import React, { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize } from "react-localize-redux"
import { Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "./../actions/authActions"
import { fetchPosts } from "./../actions/postActions"

// Import Translations
import globalTranslations from "../translations/globalTranslations.json"
// Auth
import PrivateRoute from "./common/PrivateRoute"
// Components
import Nav from "./layout/Nav"
import Landing from "./layout/Landing"
import Privacy from "./layout/Privacy"
import Footer from "./layout/Footer"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Dashboard from "./dashboard/Dashboard"
import PostNew from "./post/PostNew"
import Posts from "./post/Posts"

// Styling
import "../styles/reset.css"
import "../styles/global.css"
import "../styles/nav.css"
import "../styles/dashboard.css"
import "../styles/landing.css"
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
      translation: globalTranslations,
      options: { renderToStaticMarkup }
    })
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
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard/new-post" component={PostNew} />
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
