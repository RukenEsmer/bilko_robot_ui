import React, { useState, useEffect, useCallback, useRef } from 'react'
import Button from '../Button'
import './index.sass'
import ReactTooltip from 'react-tooltip'

const Toolbox = ({
  className,
  style,
  containerStyle,
  buttonStyle,
  position = 'bottom-right',
  button = {},
  items = [],
  defaultOpen,
  useButtonTooltip = false,
  useButtonLabel = false,
  buttonTooltipPosition,
  useTooltip = false,
  useLabels = false,
  useVisible,
  onClick,
  disabled = false
}) => {
  const [visible, setVisible] = useState(defaultOpen ? true : false)
  const visible_ = useVisible !== undefined ? useVisible : visible

  const containerRef = useRef()

  const makeTooltip = useCallback(
    (obj) => {
      return {
        'data-tip': obj.name,
        'data-effect': obj.effect || 'solid',
        'data-place':
          obj.tooltipPosition ||
          buttonTooltipPosition ||
          (position.includes('sideways')
            ? position.includes('top')
              ? 'bottom'
              : 'top'
            : position.includes('right')
            ? 'left'
            : 'right'),
        'data-type': obj.tooltipType || 'info'
      }
    },
    [buttonTooltipPosition, position]
  )

  let btnDelay = 0

  const closeToolbox = useCallback(
    (e) => {
      if (containerRef && !containerRef.current.contains(e.target)) {
        setVisible(false)
        document.removeEventListener('click', closeToolbox)
      }
    },
    [containerRef]
  )

  const onClickButton = useCallback(
    (e) => {
      if (onClick) {
        onClick(e)
      } else {
        setVisible(!visible_)
        document.addEventListener('click', closeToolbox)
      }
      setTimeout(() => ReactTooltip.rebuild(), 50)
    },
    [closeToolbox, onClick, visible_]
  )

  useEffect(() => {
    ReactTooltip.rebuild()
    return () => {
      ReactTooltip.hide()
      document.removeEventListener('click', closeToolbox)
    }
  }, [closeToolbox])

  return (
    <div
      ref={containerRef}
      className={`toolbox-container ${position}${
        className ? ` ${className}` : ''
      }${visible_ ? ' visible' : ''}`}
      style={{ ...containerStyle }}>
      <Button
        disabled={disabled}
        type={
          (button.type ? `${button.type}` : 'primary') +
          ` shadow${visible_ ? ' outlined' : ''}`
        }
        className="animated flipInX faster toolbox-toggle"
        style={{ ...buttonStyle }}
        onClick={onClickButton}
        {...(useButtonTooltip ? makeTooltip(button) : {})}>
        <span className="icon">
          {button.iconActive
            ? visible_
              ? button.iconActive
              : button.icon
            : button.icon}
        </span>
        {useButtonLabel ? <span className="label">{button.name}</span> : null}
      </Button>

      {visible_ && (
        <div
          className="toolbox animated fadeInRight faster-200"
          style={{ ...style }}>
          {items().map((tool, key) => (
            <Button
              key={key}
              disabled={disabled || tool.disabled}
              type={
                (tool.type ? ` ${tool.type}` : 'primary') +
                ' shadow toolbox-tool'
              }
              className="animated flipInY faster-400"
              style={{ animationDelay: (btnDelay += 50) + 'ms' }}
              onClick={(e) => {
                tool.onClick(e)
                if (tool.hideOnClick === undefined || tool.hideOnClick) {
                  if (onClick) {
                    onClick(e)
                    setTimeout(() => ReactTooltip.rebuild(), 50)
                  } else {
                    setVisible(false)
                    setTimeout(() => ReactTooltip.rebuild(), 50)
                  }
                }
              }}
              {...(tool.useTooltip || useTooltip ? makeTooltip(tool) : {})}>
              <span className="icon">{tool.icon}</span>
              {tool.useLabel || useLabels ? (
                <span className="label">{tool.name}</span>
              ) : null}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Toolbox
