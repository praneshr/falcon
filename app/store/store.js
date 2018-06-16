import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { read } from './utils'
import reducers from '../reducer/'
import initialState from './initial-state'

export default () => createStore(
  reducers,
  { ...initialState, ...read() },
  applyMiddleware(thunk),
)
