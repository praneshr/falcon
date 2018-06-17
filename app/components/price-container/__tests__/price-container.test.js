import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'

import PriceContainer from '../'

describe('Testing "Price Container"', () => {
  it('Should render price container', () => {
    const node = shallow(<PriceContainer
      count={10}
      originalPrice={100}
    />)
    expect(node.find('.price-container')).toHaveLength(1)
  })
  it('Should show discount and typeDiscount', () => {
    const node = shallow(<PriceContainer
      count={10}
      originalPrice={100}
      discount={45}
      typeDiscount={10}
    />)
    expect(node.find('#discount')).toHaveLength(1)
    expect(node.find('#type-discount')).toHaveLength(1)
    expect(node.find('#discount').text()).toEqual(':- $45.00')
    expect(node.find('#type-discount').text()).toEqual(':- $10.00')
  })
})
