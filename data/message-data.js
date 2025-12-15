export const MSG = {
  RECEIVE: {
    SPEED_KNOB_INFO: 5,
    LASER_ON: 8,
    LASER_OFF: 10,
    REQUEST_CUT_PARAMS: 35,
    REQUEST_PIERCE_PARAMS: 37,
    ACTIVE_CUT_SET: 40,
    ACTIVE_PIRCE_SET: 41,
    PROGRAM_START_INFO: 46,
    PROGRAM_STOP_INFO: 47,
    REQUEST_PIERCE_PROG: 50,
    CONTOP: 54,
    CHECK_LIMITS: 55,
    ROBOT_ACTIVE_BASE: 56,
    ROBOT_KINEMATICS_ENABLE: 57,
    EMERGENCY_STATE: 58,
    ROBOT_START_PROGRAM: 101,
    ROBOT_ABORT_PROGRAM: 102,
    ROBOT_START_WORKER: 103,
    ROBOT_ABORT_WORKER: 104,
    ROBOT_START_PROGRAM_OK: 110,
    ROBOT_MOVJ_COMMAND: 111,
    ROBOT_MOVL_COMMAND: 112,
    ROBOT_MOVC_COMMAND: 113,
    ROBOT_MOVS_COMMAND: 114,
    ROBOT_PULSE_COMMAND: 115
  },
  SEND: {
    CUT_PARAMS: 36,
    PIERCE_PARAMS: 37,
    C2C_PARAMS: 38,
    REFERENCE_OVERRIDE: 39,
    SET_OVERRIDE: 40,
    JUMP_TO: 47,
    PIERCE_PROGRAM_PARAMS: 51,
    SHEET_SIZE: 54,
    READY_TO_START: 57,
    GO_TO_COORDINATES: 60,
    ROBOT_TRANSLATE_ON_AXIS: 61,
    ROBOT_ROTATE_ON_AXIS: 62,
    ROBOT_SET_ACTIVE_BASE: 63,
    ROBOT_ROTATE_AXIS: 64,
    ROBOT_MOVE_TO_TARGET: 65,
    ROBOT_MOVE_TO_ANGLES: 66,
    ROBOT_ENABLE_KINEMATICS: 67,
    ROBOT_DISABLE_KINEMATICS: 68,
    PENDANT_PHYSICAL_INPUTS: 69,
    EMERGENCY_RESET: 70,
    INDEX_JOINT: 71,
    PENDANT_BUTTONS_BAR_TYPE: 72,
    ROBOT_GET_ACTIVE_BASE: 73
  }
}

export const OVRD = {
  MachineZero: 1,
  GuideLaser: 2,
  Specific: 4,
  LastStart: 5,
  LastPosition: 6,
  SELECT: {
    MachineZero: 0,
    LastPosition: 1,
    Origin: 2,
    GuideLaser: 3,
    LastStart: 4
  }
}

export const PluginMessages = {
  PLUGIN_ID: 106,
  RECEIVE: {
    ProgramState: 1,
    ProgramLoaded: 5,
    ProgramStarted: 6,
    ProgramFinished: 7,
    ProgramAborted: 8,
    LineChanged: 9,
    DebugMessageReceived: 10,
    RunTimeErrorOccured: 11,
    ErrEngine: 105,
    // ErrHeaderJsSyntaxError: 106,
    // ErrControllerJsNotOpen: 107,
    // ErrControllerJsSyntaxError: 108,
    ErrFileNotFound: 109,
    ErrFileNotOpen: 110,
    ErrFileSyntaxError: 111
  },
  SEND: {
    ProgramState: 1,
    UploadProgram: 5,
    StartProgram: 6,
    AbortProgram: 7,
    ResetProgram: 8
  }
}
