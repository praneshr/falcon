import expect from 'expect'
import React from 'react'
import spy from 'spy'
import { shallow } from 'enzyme'

import Product from '../'
import booksList from '../../../__mocks__/books-list.json'

describe('Testing "Product tile"', () => {
  it('Should render the product tile', () => {
    const node = shallow(<Product
      data={booksList[0]}
      onAddToCart={() => { }}
      onRemoveFromCart={() => { }}
    />)
    expect(node).toHaveLength(1)
    expect(node.find('button')).toHaveLength(1)
  })

  it('Should render add/remove button', () => {
    const node = shallow(<Product
      data={booksList[0]}
      countInCart={5}
      onAddToCart={() => { }}
      onRemoveFromCart={() => { }}
    />)
    expect(node.find('button')).toHaveLength(2)
  })

  it('Should handle add/remove button', () => {
    const addSpy = spy()
    const removeSpy = spy()
    const node = shallow(<Product
      data={booksList[0]}
      onAddToCart={addSpy}
      onRemoveFromCart={removeSpy}
      countInCart={2}
    />)
    node.find('#add').simulate('click')
    expect(addSpy.called).toEqual(true)
    node.find('#remove').simulate('click')
    expect(removeSpy.called).toEqual(true)
  })

  it('Should show discounts id any', () => {
    const node = shallow(<Product
      data={booksList[0]}
      countInCart={2}
      onAddToCart={() => { }}
      onRemoveFromCart={() => { }}
    />)
    expect(node.find('#discount')).toHaveLength(1)
    expect(node.find('#discount').text()).toEqual('10% off')
    expect(node.find('#discounted-price')).toHaveLength(1)
  })
})
