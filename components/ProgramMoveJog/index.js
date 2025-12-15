import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import './index.sass'

import Box from '../Box'
import Button from '../Button'
import Select from '../Select'

import { MSG } from '../../data/message-data'
import { sendMessage } from '../../store/actions/app'

const baseList = [
  { value: 0, label: 'Joint Space' },
  { value: 1, label: 'Cartesian Space' },
  { value: 2, label: 'Tool Space' },
  { value: 3, label: 'External (Page-1)' },
  { value: 4, label: 'External (Page-2)' }
]

const buttonList = [
  { id: 1, label: 'J1-', type: 'primary' },
  { id: 2, label: 'J1+', type: 'primary' },
  { id: 3, label: 'J2-', type: 'secondary' },
  { id: 4, label: 'J2+', type: 'secondary' },
  { id: 5, label: 'J3-', type: 'primary' },
  { id: 6, label: 'J3+', type: 'primary' },
  { id: 7, label: 'J4-', type: 'primary' },
  { id: 8, label: 'J4+', type: 'primary' },
  { id: 9, label: 'J5-', type: 'secondary' },
  { id: 10, label: 'J5+', type: 'secondary' },
  { id: 11, label: 'J6-', type: 'primary' },
  { id: 12, label: 'J6+', type: 'primary' },
  { id: 21, label: 'V+', type: 'primary ' },
  { id: 22, label: 'V-', type: 'primary ' },
  { id: 13, label: 'START', type: 'secondary' },
  { id: 14, label: 'STOP', type: 'secondary' },
  { id: 15, label: 'STEP', type: 'primary' },
  { id: 16, label: 'JOG', type: 'primary' },
  { id: 17, label: 'F1', type: 'primary' },
  { id: 18, label: 'F2', type: 'primary' },
  { id: 23, label: '2nd', type: 'secondary' }
]

const ProgramMoveJog = () => {
  const type = useSelector(state => state.pendantButtonsBar.type)

  const onTypeChange = useCallback(e => {
    const value = e.value
    sendMessage('send_plc_message', {
      command: MSG.SEND.ROBOT_SET_ACTIVE_BASE,
      data: [value]
    })
  }, [])

  const onButtonDown = useCallback(btnId => {
    sendMessage('send_plc_message', {
      command: MSG.SEND.PENDANT_PHYSICAL_INPUTS,
      data: [btnId, 3]
    })
  }, [])

  const onButtonUp = useCallback(btnId => {
    sendMessage('send_plc_message', {
      command: MSG.SEND.PENDANT_PHYSICAL_INPUTS,
      data: [btnId, 0]
    })
  }, [])

  return (
    <Box name="program-move-jog">
      <div className="base">
        <div className="input-group">
          <Select
            id="pendant-buttons-type-2"
            value={type}
            onChange={onTypeChange}
            options={baseList}
          />
        </div>
      </div>
      <div className="translation rotation">
        {buttonList.map((button, key) => {
          return (
            <Button
              key={key}
              type={(button.type ? button.type + ' ' : '') + 'control'}
              onTouchStart={() => onButtonDown(button.id)}
              onTouchEnd={() => onButtonUp(button.id)}>
              {button.label}
            </Button>
          )
        })}
        <Button />
        <Button />
        <Button />
      </div>
    </Box>
  )
}

export default ProgramMoveJog
