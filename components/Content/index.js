import React from 'react'
import './index.sass'

const Content = ({ children, name, noprefix, scrollable }) => {
  return (
    <div
      className={
        (noprefix ? '' : 'content') +
        (name ? ` ${name}` : '') +
        (scrollable ? ' scrollable' : '')
      }>
      {children}
    </div>
  )
}

export default Content
