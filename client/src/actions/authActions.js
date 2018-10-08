import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { USER_LOGIN, USER_LOGOUT, GET_ERRORS } from './types'
import { loading, clearLoading } from './loadingActions'
import setAuthToken from '../utils/setAuthToken'

export const login = userData => async dispatch => {
  dispatch(loading())
  try {
    const res = await axios.post('/api/admin/login', userData)
    const { token } = res.data
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    dispatch({
      type: USER_LOGIN,
      payload: decoded,
    })
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    })
  }
  dispatch(clearLoading())
}
