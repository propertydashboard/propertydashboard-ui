import React, { FunctionComponent } from 'react'

type FieldProps = {
  label: string
  value: string
  updateValue: Function
}

const Field: FunctionComponent<FieldProps> = ({
  label,
  value,
  updateValue
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={e => updateValue(e.target.value)}
      />
    </div>
  )
}

export default Field
