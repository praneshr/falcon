import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { hot, setConfig } from 'react-hot-loader'
import ReactCSS from 'react-css-modules'
import commonStyles from '@styles'
import Books from '@pages/books'
import Cart from '@pages/cart'

import styles from './styles'

@ReactCSS({ ...commonStyles, ...styles })
class Layout extends Component {
  render() {
    return (
      <div styleName="layout">
        <Router>
          <Switch>
            <Route path="/books" component={Books} />
            <Route path="/cart" component={Cart} />
            <Redirect from="/" to="/books" />
          </Switch>
        </Router>
      </div>
    )
  }
}

setConfig({
  logLevel: 'debug',
})

export default hot(module)(Layout)
