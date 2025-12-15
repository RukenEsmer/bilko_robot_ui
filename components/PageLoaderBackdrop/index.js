import React from 'react'
import './index.sass'
import PageLoader from '../PageLoader'

const PageLoaderBackdrop = ({ message, color = '#ffffff' }) => {
  return (
    <div className="page-loader-backdrop">
      <PageLoader message={message} color={color} />
    </div>
  )
}

export default PageLoaderBackdrop
