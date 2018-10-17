import { createActiveMiddleware } from 'redux-active'
import { throttle } from 'lodash'

export const activeMiddleware = createActiveMiddleware({
  idleTimeout: 500000,
  stateSelector: state => state.isActive,
  throttle,
})
