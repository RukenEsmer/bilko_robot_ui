import React, { useCallback, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.sass'

import Button from '../Button'
import { sendMessage } from '../../store/actions/app'
import Icons from '../../utils/icons'

const ProgramControls = () => {
  const dropdown = useRef()

  const dispatch = useDispatch()
  const controlsVisible = useSelector(state => state.sidebar.controlsVisible)

  const closeDropdown = useCallback(
    e => {
      if (dropdown && !dropdown.current.contains(e.target)) {
        dispatch({ type: 'HIDE_PRG_CONTROLS' })
        document.removeEventListener('click', closeDropdown)
      }
    },
    [dispatch, dropdown]
  )

  const openDropdown = useCallback(
    e => {
      dispatch({ type: 'SHOW_PRG_CONTROLS' })
      document.addEventListener('click', closeDropdown)
    },
    [dispatch, closeDropdown]
  )

  useEffect(() => {
    dispatch({ type: 'HIDE_PRG_CONTROLS' })
    return () => document.removeEventListener('click', closeDropdown)
  }, [closeDropdown, dispatch])

  return (
    <div className="program-controls">
      <div
        className={`toggle-controls animated fadeIn faster-200 ${
          controlsVisible ? 'active' : ''
        }`}
        style={{ animationDelay: '400ms' }}
        onClick={openDropdown}>
        Program
        <br />
        Controls
      </div>
      {controlsVisible && (
        <div className="controls" ref={dropdown}>
          <Button type="control" className="load-program" onClick={() => {}}>
            <span className="icon">
              <Icons.Load />
            </span>
            <span>Load Program</span>
          </Button>
          <Button
            type="control"
            onClick={() => {
              sendMessage('start_program')
              setTimeout(() => closeDropdown({ target: null }), 100)
            }}>
            <span className="icon">
              <Icons.Play />
            </span>
            <span>Start Program</span>
          </Button>
          <Button
            type="control"
            onClick={() => {
              sendMessage('pause_program')
              setTimeout(() => closeDropdown({ target: null }), 100)
            }}>
            <span className="icon">
              <Icons.Pause />
            </span>
            <span>Pause Program</span>
          </Button>
          <Button
            type="control"
            onClick={() => {
              sendMessage('reset_program')
              setTimeout(() => closeDropdown({ target: null }), 100)
            }}>
            <span className="icon">
              <Icons.Reset />
            </span>
            <span>Reset Program</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProgramControls
