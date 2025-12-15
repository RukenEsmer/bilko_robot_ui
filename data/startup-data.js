/**
 * Axis configuration ids
 */
export const AXIS_CONFIG = {
  TOOL_X: 0,
  TOOL_Y: 1,
  TOOL_Z: 2,
  TOOL_U: 3,
  TOOL_V: 4,
  TOOL_W: 5,
  JOINT_0: 6,
  JOINT_1: 7,
  JOINT_2: 8,
  JOINT_3: 9,
  JOINT_4: 10,
  JOINT_5: 11,
  JOINT_6: 12
}

/**
 * Robot base ids
 */
export const BASE_CONFIG = {
  JOINT: 0,
  CARTESIAN: 1,
  TOOL: 2,
  EXT1: 3,
  EXT2: 4
}

/**
 * Scratchpad data ids
 */
export const SCRATCHPAD_REF = {
  Power: 12,
  Feed: 13,
  Height: 14,
  Duty: 16,
  GasType: 37
}

/**
 * NCU variable ids
 */
export const NCVARU_REF = {
  Sheet: 32
}

/**
 * NCV variable ids
 */
export const NCVARV_REF = {
  Material: 22,
  Set: 23,
  PierceSet: 24,
  CutSet: 25,
  ActivePart: 27,
  ActiveContour: 28
}

/**
 * Data sets for watch
 */
export const WATCHSETS = {
  init: {
    enable: [0, 0, 0, 0, 0, 0],
    io: [],
    axis: [
      { axisno: AXIS_CONFIG.TOOL_X, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.TOOL_Y, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.TOOL_Z, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.TOOL_U, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.TOOL_V, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.TOOL_W, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.JOINT_1, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.JOINT_2, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.JOINT_3, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.JOINT_4, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.JOINT_5, index: [1, 2] }, // [Pos, Vel]
      { axisno: AXIS_CONFIG.JOINT_6, index: [1, 2] } // [Pos, Vel]
    ],
    info: [],
    scratchpad: [
      SCRATCHPAD_REF.Power,
      SCRATCHPAD_REF.Feed,
      SCRATCHPAD_REF.Height,
      SCRATCHPAD_REF.Duty,
      SCRATCHPAD_REF.GasType
    ],
    ncvaru: [NCVARU_REF.Sheet],
    ncvarv: [
      NCVARV_REF.Material,
      NCVARV_REF.Set,
      NCVARV_REF.PierceSet,
      NCVARV_REF.CutSet,
      NCVARV_REF.ActivePart,
      NCVARV_REF.ActiveContour
    ],
    interval: 200
  },
  pageProgram: {
    enable: [0],
    io: [],
    axis: [],
    info: [],
    scratchpad: [],
    interval: 200
  }
}

/**
 * Machine operation labels
 */
export const STATE_LABELS = {
  machineMode: {
    /* Basic modes */
    0: 'No Comm',
    1: 'Reset',
    2: 'Programming',
    3: 'Auto',
    4: 'Manual'
  },
  machineState: {
    /* Basic states */
    1: 'Idle',
    2: 'Clear',
    3: 'Loaded',
    4: 'Running',
    5: 'Paused',
    6: 'Stepping',
    7: 'Waiting',
    8: 'Down',
    /* Extra states */
    100: 'Normally Ended',
    101: 'Forced to End'
  },
  programState: {
    0: 'None',
    1: 'Idle',
    2: 'Loaded',
    3: 'Running',
    4: 'Finished',
    5: 'Aborted',
    6: 'Error'
  }
}

/**
 * Message types
 */
export const INFO_TYPES = {
  Default: 0,
  StaticError: 1,
  StaticWarning: 2,
  DynamicError: 3,
  DynamicWarning: 4,
  DynamicOrdinary: 5
}
