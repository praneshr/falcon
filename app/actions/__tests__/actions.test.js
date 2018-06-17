import expect from 'expect'

import { actions, actionTypes } from '../'

describe('Testing Actions', () => {
  it('Should create an action to add an item to cart', () => {
    const payload = {
      1245: 1,
    }
    const expectedAction = {
      type: actionTypes.ADD_TO_CART,
      payload,
    }
    expect(actions.addToCart(payload)).toEqual(expectedAction)
  })

  it('Should create an action to set BookList', () => {
    const payload = ['hello']
    const expectedAction = {
      type: actionTypes.BOOKS_LIST,
      payload,
    }
    expect(actions.booksList(payload)).toEqual(expectedAction)
  })
})
