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
          id="delete"
          onClick={() => onQuantityChange(0)}
        >
          x
        </span>
      </div>
      <div styleName="right">
        <div styleName="modifiers">
          <span onClick={() => onQuantityChange(count - 1)} id="remove">-</span>
          <span styleName="count">{count}</span>
          <span onClick={() => onQuantityChange(count + 1)} id="add">+</span>
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
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    type: PropTypes.string,
    img_url: PropTypes.string,
  }).isRequired,
  count: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
}

CartProductList.defaultProps = {
  currencySymbol: '$',
}

export default ReactCSS(
  CartProductList,
  { ...commonStyles, ...styles },
  { allowMultiple: true },
)
