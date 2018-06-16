import React, { Component } from 'react'
import { BrowserRouter as Router, Route , Redirect, Switch } from 'react-router-dom'
import { hot, setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import ReactCSS from 'react-css-modules'
import commonStyles from '@styles'
import Books from '@pages/books'

import styles from './styles'

@ReactCSS({ ...commonStyles, ...styles })
class Layout extends Component {

  render() {
    return (
      <Router hi>
        <Switch>
          <Route path="/books" component={Books} />
          <Redirect from="/" to="/books" />
        </Switch>
      </Router>
    )
  }
}

setConfig({
  logLevel: 'debug'
})

export default hot(module)(Layout)
