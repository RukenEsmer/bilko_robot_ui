import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import './index.sass'

import CircleLoader from 'react-spinners/CircleLoader'
import Content from '../../components/Content'

const Splash = () => {
  const { wsConnected, tcpConnected, isAuthorized } = useSelector(
    state => state.app,
    shallowEqual
  )

  return (
    <Content name="splash">
      <div className="image-spinner-container">
        <div className="loader">
          <CircleLoader color={'#093145'} size={100} />
        </div>
        <div className="loading-message">
          {isAuthorized && <div>Initializing gui components...</div>}
          {!wsConnected && (
            <div className="animated infinite flash ws-message">
              Waiting for connection...
            </div>
          )}
          {wsConnected && !tcpConnected && (
            <div className="animated infinite flash delay-1s tcp-message">
              Waiting for connection...
            </div>
          )}
        </div>
      </div>
    </Content>
  )
}

export default Splash
