import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { ADMIN_LOGIN, USER_LOGIN, USER_LOGOUT, GET_ERRORS } from './types'
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
    switch (decoded.role) {
      case 'admin':
        dispatch({
          type: ADMIN_LOGIN,
          payload: decoded,
        })
        history.push('/dashboard-admin')
      break
      case 'user':
        dispatch({
          type: USER_LOGIN,
          payload: decoded,
        })
        history.push('/dashboard')
      break
    }
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    })
  }
  dispatch(clearLoading())
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
