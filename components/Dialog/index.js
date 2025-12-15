import React, { useEffect } from 'react'
import './index.sass'
import { useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { BarLoader } from 'react-spinners'
import Button from '../Button'

const Dialog = ({
  visible = true,
  title,
  content,
  buttons = [],
  loading = false
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    ReactTooltip.hide()
    dispatch({ type: 'HIDE_KEYBOARD' })
    dispatch({ type: 'HIDE_EDITOR_KEYBOARD' })
  }, [dispatch])

  return (
    visible && (
      <div className="dialog">
        <div className="dialog-body">
          <div className="dialog-title">{title}</div>
          <div className="dialog-content">{content}</div>
          <div className="dialog-buttons">
            {buttons.map((button, key) => (
              <Button
                disabled={button.disabled}
                key={key}
                type={button.type ? button.type : 'clear'}
                onClick={button.onClick || (() => null)}>
                {button.label}
              </Button>
            ))}
          </div>
          {loading && (
            <div className="dialog-loading">
              <BarLoader
                color={'#093145'}
                loading={true}
                height={4}
                width="100%"
              />
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default Dialog
