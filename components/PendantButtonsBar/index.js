import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.sass'

import Button from '../Button'
import PendantButton from '../PendantButton'
import Select from '../Select'
import Icons from '../../utils/icons'

import { sendMessage } from '../../store/actions/app'
import { MSG } from '../../data/message-data'

const labelSets = [
  {
    setId: 0,
    list: [<Icons.World />, 'J1', 'J2', 'J3', 'J4', 'J5', 'J6'],
    label: 'Joint Space'
  },
  {
    setId: 1,
    list: [<Icons.World />, 'X', 'Y', 'Z', 'U', 'V', 'W'],
    label: 'Cartesian Space'
  },
  {
    setId: 2,
    list: [<Icons.World />, 'Tx', 'Ty', 'Tz', 'Tu', 'Tv', 'Tw'],
    label: 'Tool Space'
  },
  {
    setId: 3,
    list: [<Icons.World />, 'E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
    label: 'External (Page-1)'
  },
  {
    setId: 4,
    list: [<Icons.World />, 'E7', 'E8', 'E9', 'E10', 'E11', 'E12'],
    label: 'External (Page-2)'
  }
]

const PendantButtonsBar = () => {
  const dispatch = useDispatch()
  const type = useSelector((state) => state.pendantButtonsBar.type)
  const programState = useSelector((state) => state.programStatus.programState)

  const disabled = programState === 'Running'

  const onTypeChange = useCallback((e) => {
    const value = e.value
    sendMessage('send_plc_message', {
      command: MSG.SEND.PENDANT_BUTTONS_BAR_TYPE,
      data: [value]
    })
  }, [])

  const labels = labelSets[type].list

  return (
    <>
      <div className="pendant-buttons-bar">
        <div className="pendant-buttons-container">
          <PendantButton
            disabled={disabled}
            id="pendant-button-select-type"
            className="icon-button invert"
            style={{ animationDelay: '0ms' }}
            text={labels[0]}>
            <div className="input-group primary">
              <Select
                id="pendant-buttons-type"
                value={type}
                onChange={onTypeChange}
                options={labelSets.map((label) => {
                  return {
                    value: label.setId,
                    label: label.label
                  }
                })}
              />
            </div>
          </PendantButton>
          <PendantButton
            disabled={disabled}
            id={labels[1]}
            className=""
            style={{ animationDelay: '25ms' }}
            text={labels[1]}
            onClick={() => {}}
          />
          <PendantButton
            disabled={disabled}
            id={labels[2]}
            className=""
            style={{ animationDelay: '50ms' }}
            text={labels[2]}
            onClick={() => {}}
          />
          <PendantButton
            disabled={disabled}
            id={labels[3]}
            className=""
            style={{ animationDelay: '75ms' }}
            text={labels[3]}
            onClick={() => {}}
          />
          <PendantButton
            disabled={disabled}
            id={labels[4]}
            className=""
            style={{ animationDelay: '100ms' }}
            text={labels[4]}
            onClick={() => {}}
          />
          <PendantButton
            disabled={disabled}
            id={labels[5]}
            className=""
            style={{ animationDelay: '125ms' }}
            text={labels[5]}
            onClick={() => {}}
          />
          <PendantButton
            disabled={disabled}
            id={labels[6]}
            className=""
            style={{ animationDelay: '150ms' }}
            text={labels[6]}
            onClick={() => {}}
          />
          <PendantButton
            disabled={disabled}
            id="F1"
            className=""
            style={{ animationDelay: '175ms' }}
            text="ENB"
            onClick={() =>
              sendMessage('send_plc_message', {
                command: MSG.SEND.ROBOT_ENABLE_KINEMATICS
              })
            }
          />
          <PendantButton
            disabled={disabled}
            id="F2"
            className=""
            style={{ animationDelay: '200ms' }}
            text="DSB"
            onClick={() =>
              sendMessage('send_plc_message', {
                command: MSG.SEND.ROBOT_DISABLE_KINEMATICS
              })
            }
          />
        </div>
      </div>
      <Button
        type="secondary flat"
        className="toggle-right-bar"
        onClick={() => dispatch({ type: 'TOGGLE_PENDANT_BUTTONS_BAR' })}>
        <Icons.HideBar className="" />
      </Button>
    </>
  )
}

export default PendantButtonsBar
