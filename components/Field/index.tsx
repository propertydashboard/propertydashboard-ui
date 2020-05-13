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
    <label>
      {label}{' '}
      <input
        type="text"
        value={value}
        onChange={e => updateValue(e.target.value)}
      />
    </label>
  )
}

export default Field
