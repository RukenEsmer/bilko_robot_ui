import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.sass'

import {
  KeyboardRef,
  KeyboardContainerRef,
  setKeyboardInputRef
} from '../Keyboard'

class Input extends Component {
  constructor(props) {
    super(props)
    this.input = null
  }
  componentDidMount = () => {}

  componentWillUnmount = () => {
    document.removeEventListener('click', this.onInputFocusOut)
  }

  handleKeyboardPosition = (tg, isNumbers) => {
    const offset = tg.getBoundingClientRect()
    const width = isNumbers
      ? window.innerWidth * 0.53334
      : window.innerWidth * 0.86667
    const height = 270
    const rightEdge = offset.left + width
    const left = rightEdge > window.innerWidth ? null : offset.left
    const right =
      rightEdge > window.innerWidth
        ? window.innerWidth - offset.left - offset.width
        : null
    const bottomEdge = offset.top + offset.height + 5
    const top = bottomEdge + height > window.innerHeight ? null : bottomEdge
    const bottom =
      bottomEdge + height > window.innerHeight
        ? window.innerHeight - offset.top + 5
        : null
    this.props.dispatch({
      type: 'SET_KEYBOARD_POS',
      payload: {
        height: `${height}px`,
        width: `${width}px`,
        bottom: bottom,
        left: left,
        right:
          right !== null && right + width + 10 > window.innerWidth
            ? right + window.innerWidth - (right + width + 10)
            : right,
        top: top
      }
    })
  }

  onInputFocus = (e) => {
    const tg = e.target
    setKeyboardInputRef(tg)

    this.handleKeyboardPosition(tg, this.props.type === 'number')
    KeyboardRef.setInput(String(this.props.value))
    const payload = {
      dispatchType: this.props.dispatchType,
      input: String(this.props.value),
      layoutName: this.props.type === 'number' ? 'numbers' : 'default'
    }
    if (this.props.keyboardInit && !this.props.keyboardVisible) {
      document.addEventListener('click', this.onInputFocusOut)
      this.props.dispatch({ type: 'SHOW_KEYBOARD', payload: payload })
    } else {
      this.props.dispatch({ type: 'SET_DISPATCH_TYPE', payload: payload })
    }
  }

  onInputFocusOut = (e) => {
    e.preventDefault()
    if (
      this.input &&
      this.input.nodeName !== e.target.nodeName &&
      !KeyboardContainerRef.contains(e.target)
    ) {
      if (this.props.type === 'number' && this.props.value === '') {
        this.props.dispatch({ type: this.props.dispatchType, payload: '0' })
      }
      this.props.dispatch({ type: 'HIDE_KEYBOARD' })
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (!this.props.keyboardInit && nextProps.keyboardInit)
      this.keyboardInit = this.props.keyboardInit
    return true
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.keyboardVisible && !this.props.keyboardVisible) {
      document.removeEventListener('click', this.onInputFocusOut)
    }
  }

  onChange = (e) => {
    const { dispatch, dispatchType } = this.props
    let value = e.target.value
    KeyboardRef.setInput(value)
    dispatch({ type: 'SET_KEYBOARD_INPUT', payload: value })
    dispatch({ type: dispatchType, payload: value })
  }

  render = () => {
    const {
      className = '',
      disabled,
      dispatch,
      dispatchType,
      id,
      name,
      onChange,
      type,
      value,
      connection,
      keyboardInit,
      ...rest
    } = this.props
    return (
      <input
        ref={(e) => (this.input = e)}
        autoComplete="off"
        className={`connected ${className}`}
        disabled={!connection || disabled || !keyboardInit}
        id={id}
        name={name}
        onChange={this.onChange}
        onFocus={this.onInputFocus}
        value={value}
        {...rest}
      />
    )
  }

  initComponent = async () => {}
}

export default connect((state) => {
  return {
    connection: state.input.tcpConnected,
    keyboardInit: state.keyboard.keyboardInit
  }
})(Input)
