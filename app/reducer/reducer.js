import { handleActions } from 'redux-actions'

import { actionTypes } from '@actions'
import { createState } from './utils'

const reducer = handleActions({
  [actionTypes.ADD_TO_CART]: (state, { payload }) =>
    createState(state, payload, 'cart'),
  [actionTypes.SAMPLE]: (state, { payload }) =>
    createState(state, payload, 'sample'),
}, {})

export default reducer
