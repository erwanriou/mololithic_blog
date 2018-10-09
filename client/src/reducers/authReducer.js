import { LOADING_DATA, CLEAR_LOADING_DATA, USER_LOGIN, ADMIN_LOGIN } from '../actions/types'
import isEmpty from '../utils/isEmpty'

const initialState = {
  isUserAuthenticated: false,
  isAdminAuthenticated: false,
  type: null,
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
        isAdminAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      }
    case USER_LOGIN:
      return {
        ...state,
        isUserAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      }
    case CLEAR_LOADING_DATA:
      return {
        ...state,
        loading: false,
      }
    default :
      return state
  };
}
