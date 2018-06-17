import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'

import GoToCart from '../'

describe('Testing "Go to cart" button', () => {
  it('Should render the button', () => {
    const node = shallow(<GoToCart />)
    expect(node.find('button')).toHaveLength(1)
    expect(node.find('span')).toHaveLength(1)
  })

  it('Should handle itemCount', () => {
    const node = shallow(<GoToCart label="test" itemCount={10} />)
    expect(node.props().children).toHaveLength(3)
  })
})
