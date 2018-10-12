import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { USER_LOGIN, USER_LOGOUT, GET_ERRORS } from './types'
import { loading, clearLoading } from './loadingActions'
import setAuthToken from '../utils/setAuthToken'

export const login = (userData, history) => async dispatch => {
  dispatch(loading())
  try {
    const res = await axios.post('/api/users/login', userData)
    const { token } = res.data
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))
    history.push('/dashboard')
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    })
  }
  dispatch(clearLoading())
}

export const setCurrentUser = decoded => {
  return {
    type: USER_LOGIN,
    payload: decoded,
  }
}

// Log user out
export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(
    dispatch({
      type: USER_LOGOUT,
      payload: {},
    })
  )
}
