import React from 'react'
import { connect } from 'react-redux'
import './index.sass'

import Input from '../Input'
import Button from '../Button'

import { sendMessage } from '../../store/actions/app'
import { onTeachTargetClick } from '../../store/actions/robot'
import { MSG } from '../../data/message-data'

const ProgramMoveToTarget = ({ dispatch, target }) => {
  return (
    <div className="program-move-to-target">
      <div className="input-group">
        <div className="prepend">
          <span className="label">pX (mm)</span>
        </div>
        <Input
          id="target-x"
          value={target.x}
          dispatchType="TARGETx"
          type="number"
          step="10"
          min="-1500.00"
          max="1500.00"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">qX (rad)</span>
        </div>
        <Input
          id="target-u"
          value={target.u}
          dispatchType="TARGETu"
          type="number"
          step="0.1"
          min="-6.3"
          max="6.3"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">pY (mm)</span>
        </div>
        <Input
          id="target-y"
          value={target.y}
          dispatchType="TARGETy"
          type="number"
          step="10"
          min="-1500.00"
          max="1500.00"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">qY (rad)</span>
        </div>
        <Input
          id="target-v"
          value={target.v}
          dispatchType="TARGETv"
          type="number"
          step="0.1"
          min="-6.3"
          max="6.3"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">pZ (mm)</span>
        </div>
        <Input
          id="target-z"
          value={target.z}
          dispatchType="TARGETz"
          type="number"
          step="10"
          min="-1500.00"
          max="1500.00"
        />
      </div>
      <div className="input-group">
        <div className="prepend">
          <span className="label">qZ (rad)</span>
        </div>
        <Input
          id="target-w"
          value={target.w}
          dispatchType="TARGETw"
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
              command: MSG.SEND.ROBOT_MOVE_TO_TARGET,
              data: [
                parseFloat(target.x),
                parseFloat(target.y),
                parseFloat(target.z),
                parseFloat(target.u),
                parseFloat(target.v),
                parseFloat(target.w),
                80,
                0.0872
              ]
            })
          }>
          <span>Move To Target</span>
        </Button>
        <Button
          type="control teach"
          onClick={() => dispatch(onTeachTargetClick())}>
          <span>Teach</span>
        </Button>
      </div>
    </div>
  )
}

export default connect(state => state.manualMotion)(ProgramMoveToTarget)
