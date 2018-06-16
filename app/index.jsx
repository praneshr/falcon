import store, { save } from '@store'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './layout'


const reduxStore = store()

reduxStore.subscribe(() => {
  save({
    cart: reduxStore.getState().cart,
  })
})

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
