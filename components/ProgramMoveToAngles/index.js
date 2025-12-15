import React from 'react'
import { connect } from 'react-redux'
import './index.sass'

import Input from '../Input'
import Button from '../Button'

import { sendMessage } from '../../store/actions/app'
import { onTeachAnglesClick } from '../../store/actions/robot'
import { MSG } from '../../data/message-data'

const ProgramMoveToAngles = ({ dispatch, angles }) => {
  return (
    <div className="program-move-to-angles">
      <div className="input-group">
        <div className="prepend">
          <span className="label">q1 (rad)</span>
        </div>
        <Input
          id="angle-q1"
          value={angles.q1}
          dispatchType="ANGLEq1"
          type="number"
          step="0.1"
          min="-6.3"
          max="6.3"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">q4 (rad)</span>
        </div>
        <Input
          id="angle-q4"
          value={angles.q4}
          dispatchType="ANGLEq4"
          type="number"
          step="0.1"
          min="-6.3"
          max="6.3"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">q2 (rad)</span>
        </div>
        <Input
          id="angle-q2"
          value={angles.q2}
          dispatchType="ANGLEq2"
          type="number"
          step="0.1"
          min="-6.3"
          max="6.3"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">q5 (rad)</span>
        </div>
        <Input
          id="angle-q5"
          value={angles.q5}
          dispatchType="ANGLEq5"
          type="number"
          step="0.1"
          min="-6.3"
          max="6.3"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">q3 (rad)</span>
        </div>
        <Input
          id="angle-q3"
          value={angles.q3}
          dispatchType="ANGLEq3"
          type="number"
          step="0.1"
          min="-6.3"
          max="6.3"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">q6 (rad)</span>
        </div>
        <Input
          id="angle-q6"
          value={angles.q6}
          dispatchType="ANGLEq6"
          type="number"
          step="0.1"
          min="-6.3"
          max="6.3"
        />
      </div>
      <div className="input-group">
        <Button
          type="control"
          onClick={() =>
            sendMessage('send_plc_message', {
              command: MSG.SEND.ROBOT_MOVE_TO_ANGLES,
              data: [
                parseFloat(angles.q1),
                parseFloat(angles.q2),
                parseFloat(angles.q3),
                parseFloat(angles.q4),
                parseFloat(angles.q5),
                parseFloat(angles.q6),
                80,
                0.0872
              ]
            })
          }>
          <span>Move To Angles</span>
        </Button>
        <Button
          type="control teach"
          onClick={() => dispatch(onTeachAnglesClick())}>
          <span>Teach</span>
        </Button>
      </div>
    </div>
  )
}

export default connect(state => state.manualMotion)(ProgramMoveToAngles)
