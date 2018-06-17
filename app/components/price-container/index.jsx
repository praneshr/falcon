import React from 'react'
import ReactCSS from 'react-css-modules'
import PropTypes from 'prop-types'
import commonStyles from '@styles'

import styles from './styles'

const PriceContainer = ({
  count,
  originalPrice,
  discount,
  currencySymbol,
  typeDiscount,
}) => {
  const orderTotal = (originalPrice - (discount + typeDiscount)).toFixed(2)
  return (
    <div styleName="price-container">
      <h4>Total</h4>
      <div styleName="price">
        <div styleName="row">
          <div>Items ({count})</div>
          <div styleName="right">
            <div>:</div>
            <div>{currencySymbol}{originalPrice.toFixed(2)}</div>
          </div>
        </div>
        {
          discount > 0
          && <div styleName="row">
            <div>Discount</div>
            <div styleName="right" id="discount">
              <div>:</div>
              <div>- {currencySymbol}{discount.toFixed(2)}</div>
            </div>
          </div>
        }
        {
          typeDiscount > 0
          && <div styleName="row">
            <div>Type Discount</div>
            <div styleName="right" id="type-discount">
              <div>:</div>
              <div>- {currencySymbol}{typeDiscount.toFixed(2)}</div>
            </div>
          </div>
        }
        <div styleName="row total">
          <div>Order Total</div>
          <div styleName="right">
            <div>{currencySymbol}{orderTotal}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

PriceContainer.propTypes = {
  count: PropTypes.number.isRequired,
  originalPrice: PropTypes.number.isRequired,
  discount: PropTypes.number,
  typeDiscount: PropTypes.number,
  currencySymbol: PropTypes.string,
}

PriceContainer.defaultProps = {
  currencySymbol: '$',
  discount: 0,
  typeDiscount: 0,
}


export default ReactCSS(
  PriceContainer,
  { ...commonStyles, ...styles },
  { allowMultiple: true },
)
