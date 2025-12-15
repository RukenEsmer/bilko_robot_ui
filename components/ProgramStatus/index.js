import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import './index.sass'

import Box from '../Box'
import AddOn from '../AddOn'
import Button from '../Button'
import Icons from '../../utils/icons'

const ProgramStatus = () => {
  const dispatch = useDispatch()
  const {
    machineMode,
    simulationMode,
    infoMessage,
    infoMessageType
  } = useSelector(state => state.programStatus, shallowEqual)
  const rightBarVisible = useSelector(state => state.pendantButtonsBar.visible)
  const programState = useSelector(state => state.programStatus.programState)

  let bgMachineMode = ''
  switch (machineMode) {
    case 'Auto':
      bgMachineMode = 'bg-green'
      break
    case 'Manual':
      bgMachineMode = 'bg-blue'
      break
    case 'Programming':
      bgMachineMode = 'bg-yellow'
      break
    case 'Reset':
      bgMachineMode = 'bg-red'
      break
    default:
      bgMachineMode = 'bg-default'
      break
  }
  let machineModeLabel = (simulationMode ? 'S-' : '') + machineMode

  let bgProgramState = ''
  switch (programState) {
    case 'Running':
      bgProgramState = 'bg-green'
      break
    case 'Loaded':
    case 'Finished':
      bgProgramState = 'bg-blue'
      break
    case 'Aborted':
      bgProgramState = 'bg-yellow'
      break
    case 'Error':
      bgProgramState = 'bg-red'
      break
    case 'None':
    case 'Idle':
    default:
      bgProgramState = 'bg-default'
      break
  }

  return (
    <Box name="status-component">
      <div className="add-on-container">
        <AddOn
          prepend={<Icons.Notification size={16} />}
          content={infoMessage}
          data-tip={'Click to open system logs'}
          data-effect="solid"
          data-place="top"
          data-type="info"
          addClass={`${infoMessageType}`}
          onClick={() => dispatch({ type: 'SHOW_FOOTER_MODAL' })}
        />
      </div>
      <div className="add-on-container">
        <AddOn
          content={machineModeLabel}
          data-tip={machineModeLabel}
          data-effect="solid"
          data-place="top"
          data-type="info"
          addClass={`${bgMachineMode} no-break`}
        />
      </div>
      <div className="add-on-container">
        <AddOn
          content={programState}
          data-tip={programState}
          data-effect="solid"
          data-place="top"
          data-type="info"
          addClass={`${bgProgramState} no-break`}
        />
      </div>
      <Button
        type="secondary flat"
        className={`toggle-right-bar ${rightBarVisible ? '' : ' visible'}`}
        onClick={() => dispatch({ type: 'TOGGLE_PENDANT_BUTTONS_BAR' })}>
        <Icons.ShowBar className="animated fadeInLeft faster-200" />
      </Button>
    </Box>
  )
}

export default ProgramStatus
