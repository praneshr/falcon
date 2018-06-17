import * as APIs from '@apis'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '@actions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { computeTotal, computeDiscount, computeTypeDiscount, computeCount } from '@utils'
import ReactCSS from 'react-css-modules'
import PropTypes from 'prop-types'
import commonStyles from '@styles'

import ProductList from '@components/cart-product-list'
import PriceContainer from '@components/price-container'
import backIcon from '@assets/back.svg'

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

// Index book data for faster data fetching
const indexBooks = (books) => {
  const indexedBooks = {}
  books.forEach((book) => { indexedBooks[book.id] = book })
  return indexedBooks
}

@connect(mapStateToProps, mapDispatchToProps)
@ReactCSS({ ...commonStyles, ...styles }, { allowMultiple: true })
class Cart extends Component {
  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    setBookList: PropTypes.func.isRequired,
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
  }

  constructor(props) {
    super(props)
    this.state = {
      listLoading: this.props.booksList.length === 0,
    }
    this.onscroll = this.onscroll.bind(this)
    this.booksIndexed = indexBooks(this.props.booksList)
    this.stickyContainer = React.createRef()
    this.productsContainer = React.createRef()
  }

  componentDidMount() {
    if (this.state.listLoading) {
      this.props.getBooks()
        .then(({ data }) => {
          this.props.setBookList(data)
          this.setState({
            listLoading: false,
          })
        })
        .catch((e) => {
          alert('Something went wrong! Try again later')
        })
    }

    document.addEventListener('scroll', this.onscroll)
  }

  componentWillReceiveProps(nextProps) {
    // Update the index when new response is received
    if (this.props.booksList.length !== nextProps.booksList.length) {
      this.booksIndexed = indexBooks(nextProps.booksList)
    }

    // Redirect to /books when cart is empty
    if (Object.keys(nextProps.cart).length === 0) {
      this.props.history.push('/books')
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onscroll, false)
  }

  onscroll() {
    const elm = this.stickyContainer.current
    const productContainer = this.productsContainer.current
    const { height, y: stickyContainerY } = elm.getBoundingClientRect()
    const { y: productContainerY } = productContainer.getBoundingClientRect()

    // Unstick the price container when it reaches it's original position
    if (productContainerY === stickyContainerY) {
      elm.style.top = '30px'
    }
    // Stick the price container to the bottom of the container when
    // the scrollbar hits the page end
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      elm.style.top = `calc(100% - ${height}px)`
    }
  }

  onQuantityChange(id, value) {
    // Update the quantity of an item
    const cart = { ...this.props.cart }
    // Show a confirmation box before removing an item from cart
    if (value === 0) {
      const confirm = window.confirm('Do you want to remove this item from cart?')
      if (confirm) {
        delete cart[id]
      } else {
        return
      }
    } else {
      cart[id] = value
    }
    this.props.addToCart(cart)
  }

  render() {
    const loading = Object.keys(this.booksIndexed).length === 0
    const products = (loading ? [] : Object.keys(this.props.cart)).map((key) => {
      const count = this.props.cart[key]
      const book = this.booksIndexed[key]
      return (<ProductList
        key={book.id}
        data={book}
        onQuantityChange={value => this.onQuantityChange(key, Number(value))}
        count={count}
      />)
    })
    const costNode = !loading
      && <PriceContainer
        count={computeCount(this.props.cart)} // Compute the total number of items
        originalPrice={computeTotal(this.props.cart, this.booksIndexed)} // Compute the total price
        discount={computeDiscount(this.props.cart, this.booksIndexed)} // Compute the discount
        typeDiscount={computeTypeDiscount(this.props.cart, this.booksIndexed, ['fiction'])} // Compute the typeDiscount
      />
    return (
      <div styleName="cart">
        <div styleName="container">
          <div styleName="left">
            <div styleName="padding-fix">
              <div styleName="title-section">
                <span styleName="title">
                  <Link to="/books">
                    <img src={backIcon} alt="Back" />
                  </Link>
                  <span>Order Summary</span>
                </span>
              </div>
              <div styleName="cost">
                {costNode}
              </div>
              <div styleName="products" ref={this.productsContainer}>
                {
                  loading
                    ? 'Loading...'
                    : <div>
                      <div styleName="header">
                        <div styleName="item">Item</div>
                        <div>Qty</div>
                        <div styleName="price">Price</div>
                      </div>
                      <div styleName="values">
                        {products}
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>
          <div styleName="right" ref={this.stickyContainer}>
            <div styleName="padding-fix">
              <div styleName="cost">
                {costNode}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart
