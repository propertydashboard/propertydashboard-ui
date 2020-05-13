import React, { useState, FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import Field from '../Field'

const addPropertyMutation = gql`
  mutation addPropertyMutation(
    $id: String
    $name: String
    $price: Int
    $mortgage: Int
  ) {
    addProperty(
      input: { id: $id, name: $name, price: $price, mortgage: $mortgage }
    ) {
      id
      name
      price
      mortgage
    }
  }
`

const AddPropertyForm: FunctionComponent = () => {
  const [newPropertyId, setNewPropertyId] = useState('')
  const [newPropertyName, setNewPropertyName] = useState('')
  const [newPropertyPrice, setNewPropertyPrice] = useState('')
  const [newPropertyMortgage, setNewPropertyMortgage] = useState('')
  const [addProperty] = useMutation(addPropertyMutation)

  return (
    <div>
      <Field
        label={'ID'}
        value={newPropertyId}
        updateValue={setNewPropertyId}
      />

      <Field
        label={'Name'}
        value={newPropertyName}
        updateValue={setNewPropertyName}
      />

      <Field
        label={'Price'}
        value={newPropertyPrice}
        updateValue={setNewPropertyPrice}
      />

      <Field
        label={'Mortgage'}
        value={newPropertyMortgage}
        updateValue={setNewPropertyMortgage}
      />

      <button
        onClick={e => {
          e.preventDefault()
          addProperty({
            variables: {
              id: newPropertyId,
              name: newPropertyName,
              price: Number(newPropertyPrice),
              mortgage: Number(newPropertyMortgage)
            }
          })
          window.location.reload()
        }}
      >
        Add property
      </button>
    </div>
  )
}

export default AddPropertyForm
