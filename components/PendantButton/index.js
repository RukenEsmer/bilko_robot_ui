import React, { useState, useCallback, useRef, useEffect } from 'react'
import {} from 'react-redux'
import ReactTooltip from 'react-tooltip'
import './index.sass'

const PendantButton = ({
  text,
  onClick,
  children,
  className = '',
  disabled = false,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const contentRef = useRef()

  const closeMenu = useCallback(
    (e) => {
      if (contentRef && !contentRef.current.contains(e.target)) {
        setVisible(false)
        document.removeEventListener('click', closeMenu)
      }
    },
    [contentRef]
  )

  const openMenu = useCallback(() => {
    ReactTooltip.hide()
    setVisible(true)
    document.addEventListener('click', closeMenu)
  }, [closeMenu])

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [closeMenu])

  return (
    <div
      className={`pendant-button ${className}${disabled ? ' disabled' : ''}`}
      {...rest}>
      <div
        className={`button${visible ? ' active' : ''}`}
        onClick={disabled ? null : onClick ? onClick : openMenu}>
        <span>{text}</span>
      </div>
      {visible && (
        <div ref={contentRef} className="content animated fadeIn faster-200">
          {children}
        </div>
      )}
    </div>
  )
}

export default PendantButton
