import React from 'react'
import './index.sass'

const Checkbox = ({ id, label, checked, disabled, onClick, ...rest }) => (
  <div className="checkbox input-block" {...rest}>
    <input
      id={id}
      type="checkbox"
      onChange={() => null}
      checked={checked}
      className={disabled ? 'disabled' : ''}
    />
    <label
      onClick={disabled ? null : onClick}
      htmlFor={id}
      className={disabled ? 'disabled' : ''}>
      {label}
    </label>
  </div>
)

export default Checkbox
