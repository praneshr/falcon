import expect from 'expect'

import bookList from '../../__mocks__/books-list.json'
import cart from '../../__mocks__/cart.json'

import {
  computeCount,
  computeDiscount,
  computeTotal,
  computeTypeDiscount,
} from '../'

const indexedBooks = {}
bookList.forEach((el) => {
  indexedBooks[el.id] = el
});

describe('Testing all compute methods', () => {
  it('Should compute the item count', () => {
    expect(computeCount(cart)).toEqual(10)
  })

  it('Should compute the total price', () => {
    expect(computeTotal(cart, indexedBooks)).toEqual(2790)
  })

  it('Should compute the total price', () => {
    expect(computeDiscount(cart, indexedBooks)).toEqual(425)
  })

  it('Should compute the total price', () => {
    expect(computeTypeDiscount(cart, indexedBooks, ['fiction'])).toEqual(150)
  })
})
