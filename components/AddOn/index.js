import React from 'react'
import './index.sass'

const AddOn = ({
  prepend,
  content,
  append,
  customPrepend = false,
  customContent = false,
  customAppend = false,
  addClass,
  ...rest
}) => (
  <div className={`add-on add-on-group ${addClass ? addClass : ''}`} {...rest}>
    {customPrepend
      ? prepend
      : prepend && <div className="prepend">{prepend}</div>}
    {customContent ? content : <div className="element">{content}</div>}
    {customAppend ? append : append && <div className="append">{append}</div>}
  </div>
)

export default AddOn
