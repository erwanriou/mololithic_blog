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

export const sendPost = (newPost, file, history) => async dispatch => {
  dispatch(loading())
  const uploadConfig = await axios.get("/api/posts/upload")
  await axios.put(uploadConfig.data.url, file, {
    headers: {
      ContentType: file.type
    }
  })
  const res = await axios.post("/api/posts", {
    ...newPost,
    imageUrl: uploadConfig.data.key
  })
  history.push("/dashboard")
  dispatch({
    type: POSTS_FETCHED,
    payload: res.data
  })
  dispatch(clearLoading())
}
