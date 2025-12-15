import React, { useEffect, useRef } from 'react'
// import { KeyboardContainerRef } from '../Keyboard'
import './index.sass'
import { useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'

const Modal = ({
  closeFunction,
  className,
  children,
  style,
  bodyStyle,
  contentStyle,
  ...rest
}) => {
  const contentRef = useRef()
  const modalRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    // const closeModal = e => {
    //   setTimeout(() => {
    //     if (
    //       contentRef &&
    //       contentRef.current &&
    //       !contentRef.current.contains(e.target) &&
    //       !KeyboardContainerRef.contains(e.target)
    //     ) {
    //       if (closeFunction) {
    //         closeFunction()
    //         dispatch({ type: 'HIDE_KEYBOARD' })
    //       }
    //     }
    //   }, 0)
    // }

    const handleKeyDown = (e) => {
      switch (e.which) {
        case 27:
          if (closeFunction) {
            closeFunction()
          }
          break
        default:
          break
      }
    }

    ReactTooltip.hide()
    // document.addEventListener('click', closeModal)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      // document.removeEventListener('click', closeModal)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeFunction, dispatch])

  return (
    <div
      className={`modal ${className ? className : ''}`}
      style={style}
      ref={modalRef}
      {...rest}>
      <div className="modal-body" style={bodyStyle}>
        <div
          className="modal-close"
          onClick={() => {
            if (closeFunction) {
              closeFunction()
              dispatch({ type: 'HIDE_KEYBOARD' })
            }
          }}>
          <div className="lr">
            <div className="rl"></div>
          </div>
        </div>
        <div className="modal-content" style={contentStyle} ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
