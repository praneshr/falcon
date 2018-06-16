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
    this.booksIndexed = indexBooks(this.props.booksList)
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
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.booksList.length !== nextProps.booksList.length) {
      this.booksIndexed = indexBooks(nextProps.booksList)
    }

    if (Object.keys(nextProps.cart).length === 0) {
      this.props.history.push('/books')
    }
  }


  onQuantityChange(id, value) {
    const cart = { ...this.props.cart }
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
    return (
      <div styleName="cart">
        <div styleName="container">
          <div styleName="left">
            <div styleName="padding-fix">
              <div styleName="title-section">
                <span styleName="title">
                  <Link to="/books">&lt;</Link> Order Summary
                </span>
              </div>
              <div styleName="products">
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
          <div styleName="right">
            <div styleName="padding-fix">
              <div styleName="cost">
                {
                  !loading
                  && <PriceContainer
                    count={computeCount(this.props.cart)}
                    originalPrice={computeTotal(this.props.cart, this.booksIndexed)}
                    discount={computeDiscount(this.props.cart, this.booksIndexed)}
                    typeDiscount={computeTypeDiscount(this.props.cart, this.booksIndexed, ['fiction'])}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart
