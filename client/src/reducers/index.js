import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  localize: localizeReducer,
})
