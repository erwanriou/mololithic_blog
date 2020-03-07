import {
  LOADING_DATA,
  CLEAR_LOADING_DATA,
  POSTS_FETCHED,
  POST_FETCHED
} from "@actions/types"

const initialState = {
  posts: {},
  post: {},
  loading: false
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case POSTS_FETCHED:
      return {
        ...state,
        posts: action.payload,
        post: {},
        loading: false
      }
    case POST_FETCHED:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case CLEAR_LOADING_DATA:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
