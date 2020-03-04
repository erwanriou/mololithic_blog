import { LOADING_DATA, LOADING_AUTH_DATA, CLEAR_LOADING_DATA } from "./types"

export const loading = () => {
  return {
    type: LOADING_DATA
  }
}

export const authLoading = () => {
  return {
    type: LOADING_AUTH_DATA
  }
}

export const clearLoading = () => {
  return {
    type: CLEAR_LOADING_DATA
  }
}
