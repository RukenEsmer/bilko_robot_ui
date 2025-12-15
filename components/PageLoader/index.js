import React from 'react'
import './index.sass'
import { BarLoader } from 'react-spinners'

const PageLoader = ({ message, color = '#936037' }) => {
  return (
    <div className="page-loader animated fadeIn faster-400">
      {message && <div className="message">{message}</div>}
      <BarLoader color={color} loading={true} height={5} width={200} />
    </div>
  )
}

export default PageLoader
