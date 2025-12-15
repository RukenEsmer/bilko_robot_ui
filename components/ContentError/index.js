import React from 'react'
import './index.sass'
import Icons from '../../utils/icons'

const ContentError = ({ children, name }) => {
  return (
    <div className={'content-error' + (name ? ` ${name}` : '')}>
      <div className="error-container animated fadeInUp faster">
        <span className="icon">{<Icons.ErrorMessage />}</span>
        <span className="error">Error: {children}</span>
      </div>
    </div>
  )
}

export default ContentError
