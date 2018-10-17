import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { activeMiddleware } from './activeMiddleware'

export default applyMiddleware(
  thunk,
  activeMiddleware,
)
