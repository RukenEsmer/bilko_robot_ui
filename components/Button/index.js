import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import './index.sass'

const Button = ({
  children,
  disabled,
  type = '',
  active = false,
  style = {},
  className = '',
  onClick = () => {},
  onMouseDown = () => {},
  onMouseUp = () => {},
  useTooltip,
  tooltip = {},
  ...rest
}) => {
  const tcpConnected = useSelector(state => state.button.tcpConnected)

  const makeTooltip = useCallback(obj => {
    return {
      'data-tip': obj.tip,
      'data-effect': obj.effect || 'solid',
      'data-place': obj.place || 'top',
      'data-type': obj.type || 'info'
    }
  }, [])

  return (
    <button
      className={`connected${type ? ` ${type}` : ''}${
        className ? ` ${className}` : ''
      }${active ? ' active' : ''}`}
      disabled={!tcpConnected || disabled}
      style={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      {...(useTooltip ? makeTooltip(tooltip) : {})}
      {...rest}>
      <div>{children}</div>
    </button>
  )
}

export default Button
