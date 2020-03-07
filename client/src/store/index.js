import middleware from "./middleware"
import reducer from "./reducers"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore } from "redux"

export let store

// MANAGE COMPOSE WITH DEVTOOL FEATURE OUT OF PRODUCTION
switch (process.env.NODE_ENV) {
  case "production":
    store = createStore(reducer, middleware)
    break
  case "development":
    store = createStore(reducer, composeWithDevTools(middleware))
    break
  default:
    store = createStore(reducer, composeWithDevTools(middleware))
}
