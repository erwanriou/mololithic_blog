import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'
import { activeReducer } from 'redux-active'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  localize: localizeReducer,
  isActive: activeReducer,
})
