import React, { Fragment, useRef } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import 'animate.css/animate.compat.css'
import './index.sass'

import Main from '../../containers/Main'
import Splash from '../../containers/Splash'

import Sidebar from '../Sidebar'
import Routing from '../Routing'
import Footer from '../Footer'
import ReactTooltip from 'react-tooltip'
import Keyboard from '../Keyboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { splashVisible } = useSelector(state => state.app, shallowEqual)
  const tooltip = useRef()

  return (
    <Fragment>
      {splashVisible ? (
        <Splash />
      ) : (
        <Main>
          <Sidebar />
          <Routing />
          <Footer />
          <ReactTooltip
            ref={tooltip}
            afterHide={() => {
              tooltip.current.tooltipRef.style.left = null
              tooltip.current.tooltipRef.style.top = null
            }}
          />
          <Keyboard />
        </Main>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        bodyClassName="toastify-body"
      />
    </Fragment>
  )
}

export default App
