import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import './index.sass'

import { FaCaretDown } from 'react-icons/fa'

const Select = ({
  id = '',
  defaultValue,
  value,
  onChange = () => {},
  options,
  disabled = false,
  className = '',
  ...rest
}) => {
  const { tcpConnected } = useSelector((state) => state.button, shallowEqual)

  const [defaultValue_] = useState(defaultValue)
  const [selection, setSelection] = useState(0)
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({
    top: 0,
    right: 'auto',
    bottom: 'auto',
    left: 0,
    width: 200
  })
  const ref = useRef()
  const selRef = useRef()

  const hideOptions = useCallback(
    (e) => {
      e.preventDefault()
      if (ref && ref.current && !ref.current.contains(e.target)) {
        setVisible(false)
        document.removeEventListener('click', hideOptions)
      }
    },
    [ref]
  )

  const handlePosition = useCallback(() => {
    const { innerHeight } = window
    const { x, y, width, height } = selRef.current.getBoundingClientRect()
    setPosition({
      top: y < innerHeight * 0.5 ? y + height : 'auto',
      right: 'auto',
      bottom: y < innerHeight * 0.5 ? 'auto' : innerHeight - y,
      left: x,
      width: width < 180 ? 180 : width
    })
  }, [])

  const showOptions = useCallback(
    (e) => {
      e.preventDefault()
      handlePosition()
      setVisible(true)
      document.addEventListener('click', hideOptions)
    },
    [hideOptions, handlePosition]
  )

  const hideOptionsRaw = useCallback(() => {
    setVisible(false)
    document.removeEventListener('click', hideOptions)
  }, [hideOptions])

  useEffect(() => {
    let val = undefined

    if (options !== undefined) {
      if (value !== undefined) {
        val = options.find((opt) => opt.value === value)
      } else if (defaultValue_ !== undefined) {
        val = options.find((opt) => opt.value === defaultValue_)
      } else if (options !== undefined && options.length > 0) {
        val = options[0]
      }
    }

    if (val !== undefined) {
      setSelection(val)
    } else {
      setSelection({ label: '', value: '' })
    }

    return () => {
      document.removeEventListener('click', hideOptions)
    }
  }, [hideOptions, value, defaultValue_, options])

  const disabled_ = !tcpConnected || disabled

  return (
    <div
      id={id}
      className={
        'select connected' +
        (className ? ' ' + className : '') +
        (visible ? ' active' : '') +
        (disabled_ ? ' disabled' : '')
      }
      {...rest}>
      <div
        className="selection"
        ref={selRef}
        onClick={disabled_ ? null : showOptions}>
        <span className="value">{selection.label}</span>
        <FaCaretDown className="arrow" />
      </div>
      {visible && (
        <div
          className="options"
          ref={ref}
          style={{
            position: 'fixed',
            maxHeight: window.innerHeight * 0.55,
            ...position
          }}>
          {options !== undefined &&
            options.length > 0 &&
            options.map((option, key) => (
              <div
                key={key}
                className={
                  'option' + (option.value === selection.value ? ' active' : '')
                }
                onClick={() => {
                  if (option.value !== selection.value) {
                    const opt = { value: option.value, label: option.label }
                    setSelection(opt)
                    onChange(opt)
                  }
                  hideOptionsRaw()
                }}>
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Select
