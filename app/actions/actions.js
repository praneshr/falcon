import { createAction } from 'redux-actions'
import actionTypes from './action-types'

const addToCart = createAction(actionTypes.ADD_TO_CART)
const sample = createAction(actionTypes.SAMPLE)

export default {
  addToCart,
  sample,
}
