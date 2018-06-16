import React from 'react'
import ReactCSS from 'react-css-modules'
import PropTypes from 'prop-types'
import commonStyles from '@styles'
import cn from 'classnames'

import styles from './styles'

const Notification = ({ message, show }) => {
  return (
    <div styleName={cn('notification', { show })}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
}

export default ReactCSS(
  Notification,
  { ...commonStyles, ...styles },
  { allowMultiple: true },
)
