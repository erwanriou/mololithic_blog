import React from "react"
import { render } from "react-dom"
import jwt_decode from "jwt-decode"
import TagManager from "react-gtm-module"
import { store } from "./store"
import { Provider } from "react-redux"
import { HelmetProvider } from "react-helmet-async"
import { LocalizeProvider } from "react-localize-redux"
import { BrowserRouter as Router } from "react-router-dom"

// PWA SERVICE WORKERS
import * as serviceWorker from "./serviceWorker"

// COMPONENTS
import App from "./components/App"
import setAuthToken from "@utils/setAuthToken"
import { setCurrentUser, logout } from "@actions/authActions"

if (localStorage.jwtToken) {
  const localToken = localStorage.jwtToken
  setAuthToken(localToken)
  const decoded = jwt_decode(localToken)
  store.dispatch(setCurrentUser(decoded))

  // Automatic logout
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = "/login"
  }
}

// HANDLING CONTEXT IN REACT
const helmetContext = {}

// GENERATE AND DECLARE DATALAYER
const tagManagerArgs = {
  gtmId: "GTM-PRQSQDZ",
  dataLayer: {}
}
TagManager.initialize(tagManagerArgs)

// DEFINE ROOT ELEMENT
const rootElement = document.getElementById("bebeyogini")

render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <HelmetProvider context={helmetContext}>
        <Router>
          <App />
        </Router>
      </HelmetProvider>
    </LocalizeProvider>
  </Provider>,
  rootElement
)

serviceWorker.register()
