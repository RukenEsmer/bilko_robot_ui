import React, { useState, useCallback, useEffect, useRef } from 'react'
import Button from '../Button'
import './index.sass'
import Icons from '../../utils/icons'
import ReactTooltip from 'react-tooltip'

const Floater = ({
  showCallback,
  sendFunction,
  cancelFunction,
  sendCallback,
  cancelCallback,
  children,
  formOk = true,
  className = '',
  position = 'bottom-right',
  style,
  containerStyle,
  buttonStyle,
  button = {},
  defaultVisible = false,
  useVisible,
  hideButton = false,
  hideFunction,
  useButtonTooltip = false,
  useButtonLabel = false,
  buttonTooltipPosition
}) => {
  const [visible, setVisible] = useState(defaultVisible)
  const visible__ = useVisible !== undefined ? useVisible : visible

  const floaterRef = useRef()

  useEffect(() => {
    ReactTooltip.rebuild()
    return () => {
      ReactTooltip.hide()
    }
  }, [])

  const makeTooltip = useCallback(
    obj => {
      return {
        'data-tip': obj.name,
        'data-effect': obj.effect || 'solid',
        'data-place':
          obj.tooltipPosition ||
          buttonTooltipPosition ||
          (position.includes('right') ? 'left' : 'right'),
        'data-type': 'info'
      }
    },
    [buttonTooltipPosition, position]
  )

  return (
    <div
      ref={floaterRef}
      className={`floater-container ${position}${
        className ? ` ${className}` : ''
      }${visible__ ? ' backdrop' : ''}`}
      style={{ ...containerStyle }}>
      {!visible__ ? (
        !hideButton && (
          <div className="floater-buttons show">
            <Button
              type={(button.type ? `${button.type}` : 'primary') + ' shadow'}
              className="animated flipInX faster floater-show"
              style={{ ...buttonStyle }}
              onClick={() => {
                setTimeout(() => {
                  setVisible(true)
                  ReactTooltip.hide()
                  if (showCallback) {
                    showCallback()
                  }
                }, 50)
              }}
              {...(useButtonTooltip ? makeTooltip(button) : {})}>
              {button.icon || <Icons.Edit className={button.className} />}
              {useButtonLabel ? (
                <span className={`label ${button.className}`}>
                  {button.name}
                </span>
              ) : null}
            </Button>
          </div>
        )
      ) : (
        <>
          <div className="floater-buttons">
            <Button
              type="success shadow"
              className="animated flipInY faster floater-send"
              style={{ ...buttonStyle }}
              disabled={!formOk}
              onClick={() => {
                if (sendFunction) {
                  const ret = sendFunction()
                  if (!ret) {
                    return
                  }
                }
                setTimeout(() => {
                  if (hideFunction) {
                    hideFunction()
                  } else if (floaterRef.current) {
                    setVisible(false)
                    if (sendCallback) {
                      sendCallback()
                    }
                  }
                }, 50)
              }}>
              <Icons.Check />
            </Button>
            <Button
              type="danger shadow"
              className="animated flipInY faster floater-cancel"
              style={{ ...buttonStyle }}
              onClick={() => {
                if (cancelFunction) {
                  const ret = cancelFunction()
                  if (!ret) {
                    return
                  }
                }
                setTimeout(() => {
                  if (hideFunction) {
                    hideFunction()
                  } else if (floaterRef.current) {
                    setVisible(false)
                    if (cancelCallback) {
                      cancelCallback()
                    }
                  }
                }, 50)
              }}>
              <Icons.Cancel />
            </Button>
          </div>
          <div className="floater animated fadeIn faster" style={{ ...style }}>
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export default Floater
