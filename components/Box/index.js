import React from 'react'
import { BarLoader } from 'react-spinners'
import './index.sass'

const Box = ({ children, name = '', loading = false }) => (
  <div className={`box ${name ? name : ''} ${loading ? 'loading' : ''}`}>
    {loading ? (
      <div className="loading-container">
        <BarLoader color={'#093145'} loading={true} height={4} width={100} />
      </div>
    ) : (
      children
    )}
  </div>
)

export default Box
