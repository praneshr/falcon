import * as APIs from '@apis'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { actions } from '@actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { computeCount } from '@utils'
import ReactCSS from 'react-css-modules'
import commonStyles from '@styles'
import GoToCart from '@components/go-to-cart-button'
import ProductTile from '@components/product-tile'
import Notification from '@components/notification'

import styles from './styles'

const mapStateToProps = store => ({
  cart: store.cart,
  booksList: store.booksList,
})

const mapDispatchToProps = dispatch => ({
  getBooks: bindActionCreators(APIs.getBooks, dispatch),
  addToCart: bindActionCreators(actions.addToCart, dispatch),
  setBookList: bindActionCreators(actions.booksList, dispatch),
})

@connect(mapStateToProps, mapDispatchToProps)
@ReactCSS({ ...commonStyles, ...styles }, { allowMultiple: true })
class Books extends Component {
  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    setBookList: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    booksList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        discount: PropTypes.number,
        type: PropTypes.string,
        img_url: PropTypes.string,
      }),
    ).isRequired,
    cart: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      showNotification: false,
      notificationMessage: '',
    }
    this.triggerNotification = this.triggerNotification.bind(this)
    this.timerId = null
  }

  componentDidMount() {
    this.mounted = true
    // Check for booksList in store. If exists, skip network call
    if (this.props.booksList.length === 0) {
      this.props.getBooks()
        .then(({ data }) => {
          this.props.setBookList(data)
        })
        .catch((e) => {
          alert('Something went wrong! Try again later')
        })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  triggerNotification(message) {
    // Show notification with a timeout of 3s. On new notification
    // before 3s, clear the timeout and trigger a new notification
    if (this.mounted) {
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
          if (this.mounted) {
            this.setState({
              showNotification: false,
            })
          }
        }, 3000)
      })
    }
    return
  }

  addOrRemoveItemFromCart({ id, ...rest }, action) {
    // Update the quantity of an item in the cart. The key will be the
    // id of the item and the value will be the quantity of that item
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
    const products = this.props.booksList.map(data => (<ProductTile
      currencySymbol="$"
      onAddToCart={() => this.addOrRemoveItemFromCart(data, 'ADD')}
      onRemoveFromCart={() => this.addOrRemoveItemFromCart(data, 'REMOVE')}
      data={data}
      key={data.id}
      countInCart={this.props.cart[data.id] || 0}
    />))
    const cartCount = computeCount(this.props.cart)
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
              this.props.booksList.length === 0
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
