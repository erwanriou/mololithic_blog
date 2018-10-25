import axios from "axios"
import { POSTS_FETCHED, POST_FETCHED, GET_ERRORS } from "./types"
import { loading, clearLoading } from "./loadingActions"

export const fetchPosts = () => async dispatch => {
  dispatch(loading())
  try {
    const res = await axios.get("/api/posts")
    dispatch({
      type: POSTS_FETCHED,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
  dispatch(clearLoading())
}

export const sendPost = (newPost, history) => async dispatch => {
  dispatch(loading())
  const res = await axios.post("/api/posts/new", newPost)
  history.push("/dashboard")
  dispatch(fetchPosts())
  dispatch(clearLoading())
}
