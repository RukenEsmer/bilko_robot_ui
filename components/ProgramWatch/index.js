import React, { useCallback, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import './index.sass'

import Box from '../Box'

import { wsPosModule } from '../../utils/websocket'

const ProgramWatch = () => {
  const axisPosition = useSelector(
    state => state.programWatch.axis.position,
    shallowEqual
  )
  // const axisVelocity = useSelector(
  //   state => state.programWatch.axis.velocity,
  //   shallowEqual
  // )

  const WatchRow = useCallback(({ label, first, last }) => {
    return (
      <div className="watch-row">
        <span className="axis-name">{label}</span>
        <span>{first}</span>
        <span>{last}</span>
      </div>
    )
  }, [])

  useEffect(() => {
    wsPosModule.startDataPublish()
    return () => {
      wsPosModule.stopDataPublish()
    }
  }, [])

  return (
    <>
      <Box name="program-watch">
        <div className="axis-watch-table">
          {Object.keys(axisPosition).length > 5 && (
            <div className="left">
              <div className="watch-row">
                <span className="axis-name">Axis</span>
                <span>Position</span>
                <span>Velocity</span>
              </div>
              <WatchRow label="X" first={axisPosition[0]} last="-" />
              <WatchRow label="Y" first={axisPosition[1]} last="-" />
              <WatchRow label="Z" first={axisPosition[2]} last="-" />
              <WatchRow label="U" first={axisPosition[3]} last="-" />
              <WatchRow label="V" first={axisPosition[4]} last="-" />
              <WatchRow label="W" first={axisPosition[5]} last="-" />
            </div>
          )}
          {Object.keys(axisPosition).length > 11 && (
            <div className="right">
              <div className="watch-row">
                <span className="axis-name">Axis</span>
                <span>Position</span>
                <span>Velocity</span>
              </div>
              <WatchRow label="J1" first={axisPosition[6]} last="-" />
              <WatchRow label="J2" first={axisPosition[7]} last="-" />
              <WatchRow label="J3" first={axisPosition[8]} last="-" />
              <WatchRow label="J4" first={axisPosition[9]} last="-" />
              <WatchRow label="J5" first={axisPosition[10]} last="-" />
              <WatchRow label="J6" first={axisPosition[11]} last="-" />
            </div>
          )}
        </div>
      </Box>
    </>
  )
}

export default ProgramWatch
