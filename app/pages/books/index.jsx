import * as PropTypes from 'prop-types'
import * as APIs from '@apis'
import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { actions } from '@actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import ReactCSS from 'react-css-modules'
import commonStyles from '@styles'
import GoToCart from '@components/go-to-cart-button'
import ProductTile from '@components/product-tile'
import Notification from '@components/notification'

import styles from './styles'

const mapStateToProps = store => ({
  cart: store.cart,
})

const mapDispatchToProps = dispatch => ({
  getBooks: bindActionCreators(APIs.getBooks, dispatch),
  addToCart: bindActionCreators(actions.addToCart, dispatch),
})

@connect(mapStateToProps, mapDispatchToProps)
@ReactCSS({ ...commonStyles, ...styles }, { allowMultiple: true })
class Books extends Component {
  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired, // [TODO]: Fix this later
  }

  constructor(props) {
    super(props)
    this.state = {
      listLoading: true,
      booksList: [],
      showNotification: false,
      notificationMessage: '',
    }
    this.triggerNotification = this.triggerNotification.bind(this)
    this.timerId = null
  }

  componentDidMount() {
    this.props.getBooks()
      .then(({ data }) => this.setState({
        listLoading: false,
        booksList: data,
      }))
  }

  triggerNotification(message) {
    if (this.state.showNotification) {
      return this.setState({
        showNotification: false,
      }, () => {
        window.clearTimeout(this.timerId)
        window.setTimeout(this.triggerNotification, 200, message)
      })
    }
    this.setState({
      showNotification: true,
      notificationMessage: message,
    }, () => {
      this.timerId = window.setTimeout(() => {
        this.setState({
          showNotification: false,
        })
      }, 3000)
    })
  }

  addOrRemoveItemFromCart({ id, ...rest }, action) {
    const cartData = { ...this.props.cart }
    switch (action) {
      case 'ADD':
        cartData[id] = (cartData[id] || 0) + 1
        this.triggerNotification(`'${rest.name}' added to cart`)
        break
      case 'REMOVE':
        cartData[id] = (cartData[id] || 0) - 1
        this.triggerNotification(`'${rest.name}' removed from cart`)
        break
      default:
        break
    }
    this.props.addToCart(cartData)
  }

  render() {
    const products = this.state.booksList.map(data => (<ProductTile
      currencySymbol="$"
      onAddToCart={() => this.addOrRemoveItemFromCart(data, 'ADD')}
      onRemoveFromCart={() => this.addOrRemoveItemFromCart(data, 'REMOVE')}
      data={data}
      key={data.id}
      countInCart={this.props.cart[data.id] || 0}
    />))
    const cartCount = Object.keys(this.props.cart).reduce(
      (value, key) => this.props.cart[key] + value,
      0,
    )
    return (
      <div styleName="books">
        <Notification
          show={this.state.showNotification}
          message={this.state.notificationMessage}
        />
        <div styleName="container">
          <div styleName="title-section">
            <span styleName="title">
              All Items
            </span>
            <span>
              <Link to="/cart">
                {
                  cartCount > 0
                  && <GoToCart
                    label="Go to Cart"
                    itemCount={cartCount}
                  />
                }
              </Link>
            </span>
          </div>
          <div styleName="products">
            {
              this.state.listLoading
                ? 'Loading...'
                : <div styleName="result-container">
                  {products}
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Books
