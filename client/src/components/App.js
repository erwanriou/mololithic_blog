import React, { Suspense, Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize, getTranslate } from "react-localize-redux"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

// IMPORT ACTIONS
import { logout } from "@actions/authActions"

// IMPORT TRANSLATIONS
import EN from "../translations/en.translations.json"
import ES from "../translations/es.translations.json"

// IMPORT UTILS
import isEmpty from "@utils/isEmpty"

// IMPORT ROUTES
import Router from "./Router"

// IMPORT COMPONENTS
import Loading from "@common/Loader"
import Nav from "./layout/Nav"
import Footer from "./layout/Footer"

// IMPORT STYLES
import "./../styles"

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
    const { translate, location } = this.props
    return (
      <Fragment>
        <Nav translate={translate} />
        <Suspense fallback={<Loading />}>
          <Router translate={translate} router={location} />
        </Suspense>
        <Footer translate={translate} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.localize),
  isActive: state.isActive
})

export default withLocalize(
  withRouter(
    connect(
      mapStateToProps,
      { logout }
    )(App)
  )
)
