import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'
import middleware from './middleware'
import reducer from './reducers'
import * as serviceWorker from './serviceWorker'

const store = createStore(reducer, composeWithDevTools(middleware))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
