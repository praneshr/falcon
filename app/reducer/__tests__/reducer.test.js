import expect from 'expect'

import { actionTypes } from '../../actions'
import reducer from '../'


describe('Testing Reducers', () => {

  it('Should handle ADD_TO_CART', () => {
    expect(reducer(
      {},
      {
        type: actionTypes.ADD_TO_CART,
        payload: { 123: 45 },
      },
    )).toEqual({
      cart: {
        123: 45,
      },
    })
  })

  it('Should handle BOOKS_LIST', () => {
    expect(reducer(
      {},
      {
        type: actionTypes.BOOKS_LIST,
        payload: ['one'],
      },
    )).toEqual({
      booksList: ['one'],
    })
  })

})
