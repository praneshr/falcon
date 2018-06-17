import expect from 'expect'
import React from 'react'
import spy from 'spy'
import { shallow } from 'enzyme'

import ProductList from '../'
import booksList from '../../../__mocks__/books-list.json'

describe('Testing "Cart Product List"', () => {
  it('Should render cart product list', () => {
    const node = shallow(<ProductList
      data={booksList[0]}
      count={5}
      onQuantityChange={() => { }}
    />)
    expect(node.props().className).toEqual(expect.stringContaining('cart-product-list'))
  })

  it('Should handle add/remove/delete quantity', () => {
    const onQuantityChangeSpy = spy()
    const node = shallow(<ProductList
      data={booksList[0]}
      count={5}
      onQuantityChange={onQuantityChangeSpy}
    />)
    node.find('#add').simulate('click')
    expect(onQuantityChangeSpy.calledWith(6)).toEqual(true)
    node.find('#remove').simulate('click')
    expect(onQuantityChangeSpy.calledWith(4)).toEqual(true)
    node.find('#delete').simulate('click')
    expect(onQuantityChangeSpy.calledWith(0)).toEqual(true)
  })
})
