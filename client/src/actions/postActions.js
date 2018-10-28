import axios from "axios"
import { POSTS_FETCHED, GET_ERRORS } from "./types"
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

export const sendPost = (values, file, history) => async dispatch => {
  dispatch(loading())
  const uploadConfig = await axios.get("/api/posts/upload")
  delete axios.defaults.headers.common["Authorization"]
  await axios.put(uploadConfig.data.url, file, {
    headers: {
      ContentType: file.type
    }
  })
  const token = localStorage.getItem("jwtToken")
  axios.defaults.headers.common["Authorization"] = token
  await axios.post("/api/posts", {
    ...values,
    imageUrl: uploadConfig.data.key
  })
  dispatch(fetchPosts())
  history.push("/dashboard")
}
