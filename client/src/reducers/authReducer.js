import { LOADING_DATA, CLEAR_LOADING_DATA, USER_LOGIN, USER_LOGOUT, ADMIN_LOGIN } from '../actions/types'
import isEmpty from '../utils/isEmpty'

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
}

export default function authReducer (state = initialState, action) {
  switch(action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case ADMIN_LOGIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      }
    case USER_LOGIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      }
    case USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
      }
    case CLEAR_LOADING_DATA:
      return {
        ...state,
        loading: false,
      }
    default :
      return state
  }
}
