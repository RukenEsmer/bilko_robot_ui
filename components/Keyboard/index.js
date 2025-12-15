import React, { Component } from 'react'
import { connect } from 'react-redux'
import SimpleKeyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import './index.sass'

export let KeyboardRef = null
export let KeyboardContainerRef = null

let KeyboardInputRef = null
export const setKeyboardInputRef = (ref) => {
  KeyboardInputRef = ref
}

const keyboardOptions = {
  layout: {
    default: [
      'q w e r t y u i o p',
      'a s d f g h j k l {bksp}',
      '{shift} z x c v b n m {arrowleft} {arrowright}',
      '{alt} , {space} . {esc}'
    ],
    shift: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L {bksp}',
      '{shiftactivated} Z X C V B N M {arrowleft} {arrowright}',
      '{alt} , {space} . {esc}'
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0',
      `@ # % & * ( ) ' " {bksp}`,
      '- + = / ; : ! ? , .',
      '{default} , {space} . {esc}'
    ],
    numbers: [
      '1 2 3 -',
      '4 5 6 {arrowleft}',
      '7 8 9 {arrowright}',
      '{bksp} 0 {numpaddecimal} {esc}'
    ]
  },
  display: {
    '{bksp}': String.fromCharCode(0x232b),
    // '{plus}': String.fromCharCode(0x25b2) + String.fromCharCode(0xff0b),
    // '{minus}': String.fromCharCode(0x25bc) + String.fromCharCode(0xff0d),
    '{esc}': 'OK',
    '{numpaddecimal}': '.',
    '{escape}': 'esc ⎋',
    '{shift}': '⇧',
    '{alt}': '.?123',
    '{shiftactivated}': '⇧',
    '{enter}': '⏎',
    '{space}': ' ',
    '{arrowleft}': '←',
    '{arrowright}': '→',
    '{default}': 'ABC'
  },
  theme: 'hg-theme-default hg-theme-ios',
  physicalKeyboardHighlight: true,
  syncInstanceInputs: true,
  disableButtonHold: true,
  disableCaretPositioning: false,
  preventMouseDownDefault: true,
  autoUseTouchEvents: true
}

class Keyboard extends Component {
  constructor(props) {
    super(props)
    this.layoutName = 'default'
  }

  componentDidMount = () => {}

  componentWillUnmount = () => {
    this.props.dispatch({ type: 'KEYBOARD_WILL_UNMOUNT' })
  }

  shouldComponentUpdate = (nextProps, nextState) => true

  componentDidUpdate = (prevProps) => {
    if (this.props.input !== prevProps.input)
      KeyboardRef.setInput(this.props.input)
  }

  changeStyle = (opt) => {
    return {
      bottom: this.props.offsetBottom,
      left: this.props.offsetLeft,
      top: this.props.offsetTop,
      right: this.props.offsetRight
    }
  }

  render = () => {
    const { keyboardVisible, layoutName } = this.props
    const className = keyboardVisible ? 'keyboard visible' : 'keyboard hidden'
    return (
      <div
        id="keyboard"
        className={`${className} ${layoutName}`}
        ref={(e) => (KeyboardContainerRef = e)}
        style={this.changeStyle()}>
        <SimpleKeyboard
          baseClass="a-unique-keyboard-class"
          keyboardRef={(e) => {
            KeyboardRef = e
            this.props.dispatch({ type: 'KEYBOARD_INIT_COMPLETE' })
          }}
          layoutName={layoutName}
          onChange={this.onChange}
          onKeyReleased={this.onKeyReleased}
          {...keyboardOptions}
        />
      </div>
    )
  }

  initComponent = async () => {}

  onChange = (input) => {
    this.props.dispatch({ type: this.props.dispatchType, payload: input })
    if (KeyboardInputRef) {
      KeyboardInputRef.setSelectionRange(
        KeyboardRef.caretPosition,
        KeyboardRef.caretPosition
      )
    }
  }

  onKeyReleased = (button) => {
    if (button.includes('{') && button.includes('}')) {
      let currentLayout = KeyboardRef.options.layoutName
      let layoutName = currentLayout
      switch (button) {
        case '{esc}':
          setTimeout(() => {
            this.props.dispatch({ type: 'HIDE_KEYBOARD' })
          }, 50)
          break
        case '{shift}':
        case '{shiftactivated}':
        case '{default}':
          layoutName = currentLayout === 'default' ? 'shift' : 'default'
          break
        case '{alt}':
        case '{altright}':
          layoutName = currentLayout === 'alt' ? 'default' : 'alt'
          break
        case '{smileys}':
          layoutName = currentLayout === 'smileys' ? 'default' : 'smileys'
          break
        case '{arrowleft}':
          {
            const pos =
              KeyboardRef.caretPosition > 0 ? KeyboardRef.caretPosition - 1 : 0
            KeyboardRef.setCaretPosition(pos, pos)
            window.requestAnimationFrame(() => {
              if (KeyboardInputRef) {
                KeyboardInputRef.setSelectionRange(pos, pos)
              }
            })
          }
          break
        case '{arrowright}':
          {
            const pos =
              KeyboardRef.caretPosition < KeyboardRef.input.default.length
                ? KeyboardRef.caretPosition + 1
                : KeyboardRef.input.default.length
            KeyboardRef.setCaretPosition(pos, pos)
            window.requestAnimationFrame(() => {
              if (KeyboardInputRef) {
                KeyboardInputRef.setSelectionRange(pos, pos)
              }
            })
          }
          break

        default:
          break
      }
      KeyboardRef.setOptions({
        layoutName: layoutName
      })
    }
  }
}

export default connect((state) => state.keyboard)(Keyboard)
