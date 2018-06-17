import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'

import Notification from '../'

describe('Testing "Notification"', () => {
  it('Should render notification', () => {
    const node = shallow(<Notification
      message="hello"
    />)
    expect(node.props().className).toEqual(expect.not.stringContaining('show'))
  })

  it('Should show notification', () => {
    const node = shallow(<Notification
      message="hello"
      show
    />)
    expect(node.props().className).toEqual(expect.stringContaining('show'))
  })
})
