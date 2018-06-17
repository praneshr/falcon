import React from 'react'
import PropTypes from 'prop-types'
import ReactCSS from 'react-css-modules'
import commonStyles from '@styles'

import styles from './styles'

const GotoCartButton = props => (
  <button onClick={props.onClick} styleName="primary cart-info">
    <span>
      {props.label}
    </span>
    {
      props.itemCount > 0
      && <span styleName="item-count">
        {props.itemCount}
      </span>
    }
  </button>
)

GotoCartButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  itemCount: PropTypes.number,
}

GotoCartButton.defaultProps = {
  label: 'Cart',
  onClick: () => { },
  itemCount: 0,
}

export default ReactCSS(
  GotoCartButton,
  { ...commonStyles, ...styles },
  { allowMultiple: true },
)
