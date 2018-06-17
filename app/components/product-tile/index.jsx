import React from 'react'
import PropTypes from 'prop-types'
import ReactCSS from 'react-css-modules'
import commonStyles from '@styles'

import styles from './styles'

const ProductTile = ({
  data,
  currencySymbol,
  onAddToCart,
  onRemoveFromCart,
  countInCart,
}) => {
  const priceNode = `${currencySymbol}${data.price}`
  const newPrice = data.price - ((data.price * data.discount) / 100)
  const discountPriceNode = (<span id="discounted-price">
    <span styleName="old-price">
      {priceNode}
    </span>
    <span className="new-price">
      {currencySymbol}{newPrice}
    </span>
  </span>)
  return (
    <div styleName="tile">
      <div styleName="product-tile-container">
        <div styleName="product-tile">
          {
            data.discount !== 0
            && <span styleName="discount" id="discount">
              {data.discount}% off
            </span>
          }
          <div styleName="top">
            <img src={data.img_url} alt={data.name}/>
          </div>
          <div styleName="bottom">
            <div styleName="title-container">
              {data.name}
            </div>
            <div styleName="price-and-cta">
              <span styleName="price">
                {
                  data.discount === 0
                    ? priceNode
                    : discountPriceNode
              }

              </span>
              <span>
                {
                  countInCart === 0
                    ? <button
                      id="add"
                      styleName="outline small"
                      onClick={onAddToCart}
                    >
                      Add to Cart
                    </button>
                    : <span>
                      <button
                        id="remove"
                        styleName="outline small"
                        onClick={onRemoveFromCart}
                      >
                        -
                      </button>
                      <span
                        styleName="cart-count"
                      >
                        {countInCart}
                      </span>
                      <button
                        id="add"
                        styleName="outline small"
                        onClick={onAddToCart}
                      >
                        +
                      </button>
                    </span>
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductTile.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    type: PropTypes.string,
    img_url: PropTypes.string,
  }).isRequired,
  currencySymbol: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  countInCart: PropTypes.number,
}

ProductTile.defaultProps = {
  currencySymbol: '$',
  countInCart: 0,
}

export default ReactCSS(
  ProductTile,
  { ...commonStyles, ...styles },
  { allowMultiple: true },
)
