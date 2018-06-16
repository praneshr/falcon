import { createAction } from 'redux-actions'
import actionTypes from './action-types'

const addToCart = createAction(actionTypes.ADD_TO_CART)
const booksList = createAction(actionTypes.BOOKS_LIST)

export default {
  addToCart,
  booksList,
}
