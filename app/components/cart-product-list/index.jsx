import React from 'react'
import ReactCSS from 'react-css-modules'
import PropTypes from 'prop-types'
import commonStyles from '@styles'

import styles from './styles'

const CartProductList = ({
  data,
  count,
  onQuantityChange,
  currencySymbol,
}) => {
  return (
    <div styleName="cart-product-list">
      <div styleName="left">
        <img src={data.img_url} alt={data.name} />
        <span styleName="name">
          {data.name}
        </span>
        <span
          styleName="remove"
          onClick={() => onQuantityChange(0)}
        >
          x
        </span>
      </div>
      <div styleName="right">
        <div styleName="modifiers">
          <span onClick={() => onQuantityChange(count - 1)}>-</span>
          <span styleName="count">{count}</span>
          <span onClick={() => onQuantityChange(count + 1)}>+</span>
        </div>
        <span styleName="total">
          {currencySymbol}
          {count * data.price}
        </span>
      </div>
    </div>
  )
}

CartProductList.propTypes = {
  currencySymbol: PropTypes.string,
}

CartProductList.defaultProps = {
  currencySymbol: '$',
}

export default ReactCSS(
  CartProductList,
  { ...commonStyles, ...styles },
  { allowMultiple: true },
)
