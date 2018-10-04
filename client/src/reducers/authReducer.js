import { LOADING_DATA, CLEAR_LOADING_DATA } from '../actions/types'
import isEmpty from '../utils/isEmpty'

const initialState = {
  isAuthenticated: false,
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
    case CLEAR_LOADING_DATA:
      return {
        ...state,
        loading: false,
      }
    default :
      return state
  };
}