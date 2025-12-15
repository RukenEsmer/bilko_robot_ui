import React, { useRef, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './index.sass'

import Button from '../Button'
import { sendMessage } from '../../store/actions/app'
import ReactTooltip from 'react-tooltip'

const { REACT_APP_SHOW_SIMULATION_CONTROLS } = process.env

const ProgramModes = () => {
  const dropdown = useRef()

  const dispatch = useDispatch()
  const modesVisible = useSelector((state) => state.sidebar.modesVisible)
  const machineMode = useSelector((state) => state.programStatus.machineMode)
  const programState = useSelector((state) => state.programStatus.programState)

  const disabled =
    machineMode === 'No Comm' ||
    machineMode === 'Reset' ||
    programState === 'Running'

  const closeDropdown = useCallback(
    (e) => {
      if (dropdown && !dropdown.current.contains(e.target)) {
        dispatch({ type: 'HIDE_PRG_MODES' })
        document.removeEventListener('click', closeDropdown)
      }
    },
    [dispatch, dropdown]
  )

  const openDropdown = useCallback(() => {
    ReactTooltip.hide()
    dispatch({ type: 'SHOW_PRG_MODES' })
    document.addEventListener('click', closeDropdown)
  }, [dispatch, closeDropdown])

  useEffect(() => {
    dispatch({ type: 'HIDE_PRG_MODES' })
    return () => document.removeEventListener('click', closeDropdown)
  }, [closeDropdown, dispatch])

  return (
    <div className="program-modes">
      <div
        className={`toggle-modes${modesVisible ? ' active' : ''}${
          disabled ? ' disabled' : ''
        }`}
        style={{ animationDelay: '200ms' }}
        onClick={disabled ? null : openDropdown}>
        Program
        <br />
        Modes
      </div>
      {modesVisible && (
        <div className="modes" ref={dropdown}>
          <Button
            disabled={disabled}
            onClick={() => {
              sendMessage('change_machine_mode', { mode: 'programming' })
              setTimeout(() => closeDropdown({ target: null }), 100)
            }}>
            <span className="icon mode-programming">P</span>
            <span>Program Mode</span>
          </Button>
          <Button
            disabled={disabled}
            onClick={() => {
              sendMessage('change_machine_mode', { mode: 'manual' })
              setTimeout(() => closeDropdown({ target: null }), 100)
            }}>
            <span className="icon mode-manual">M</span>
            <span>Manual Mode</span>
          </Button>
          <Button
            disabled={disabled}
            onClick={() => {
              sendMessage('change_machine_mode', { mode: 'auto' })
              setTimeout(() => closeDropdown({ target: null }), 100)
            }}>
            <span className="icon mode-auto">A</span>
            <span>Auto Mode</span>
          </Button>
          {REACT_APP_SHOW_SIMULATION_CONTROLS === 'true' && (
            <React.Fragment>
              <Button
                disabled={disabled}
                onClick={() => {
                  sendMessage('reconfigure_machine')
                  setTimeout(() => closeDropdown({ target: null }), 100)
                }}>
                <span className="icon mode-reconfigure">R</span>
                <span>Reconf.</span>
              </Button>
              <Button
                disabled={disabled}
                onClick={() => sendMessage('start_simulation')}>
                <span className="icon mode-simulation-start">S</span>
                <span>Start Simulation</span>
              </Button>
              <Button
                disabled={disabled}
                onClick={() => sendMessage('stop_simulation')}>
                <span className="icon mode-simulation-stop">S</span>
                <span>Stop Simulation</span>
              </Button>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  )
}

export default ProgramModes
