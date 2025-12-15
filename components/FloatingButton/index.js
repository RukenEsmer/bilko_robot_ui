import React, { useCallback, useEffect, useState } from 'react'
import Button from '../Button'
import './index.sass'
import ReactTooltip from 'react-tooltip'

const FloatingButton = ({
  style,
  className = '',
  label,
  activeLabel,
  type,
  activeType,
  icon,
  activeIcon,
  onClick,
  position = 'bottom-right',
  containerClassName = '',
  containerStyle,
  labelClassName = '',
  visible = true,
  useButtonLabel = false,
  useTooltip = false,
  tooltipPosition,
  tooltipEffect,
  toggle = false,
  initialState = false,
  disabled
}) => {
  const [toggled, setToggled] = useState(initialState)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  const makeTooltip = useCallback(
    obj => {
      return {
        'data-tip': obj.label,
        'data-effect': obj.effect || 'solid',
        'data-place':
          tooltipPosition || (position.includes('right') ? 'left' : 'right'),
        'data-type': 'info'
      }
    },
    [tooltipPosition, position]
  )

  return (
    visible && (
      <div
        className={`floating-button-container ${position} ${containerClassName}`}
        style={{ ...containerStyle }}>
        <Button
          type={
            (type ? `${toggled ? activeType : type}` : 'primary') + ' shadow'
          }
          className={`animated flipInX faster floating-button ${className}`}
          style={{ ...style }}
          disabled={disabled !== undefined ? disabled : null}
          onClick={
            toggle
              ? e => {
                  ReactTooltip.hide()
                  onClick(e)
                  setToggled(!toggled)
                }
              : onClick
          }
          {...(useTooltip
            ? makeTooltip({ label: label, effect: tooltipEffect })
            : {})}>
          {toggled ? activeIcon : icon}
          {useButtonLabel ? (
            <span className={`label ${labelClassName}`}>
              {toggled ? activeLabel : label}
            </span>
          ) : null}
        </Button>
      </div>
    )
  )
}

export default FloatingButton
