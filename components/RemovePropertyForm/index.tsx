import React, { useState, FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

type Props = {
  properties: []
}

const removePropertyMutation = gql`
  mutation removePropertyMutation($id: String) {
    removeProperty(id: $id) {
      id
      name
      price
      mortgage
    }
  }
`

const RemovePropertyForm: FunctionComponent<Props> = ({ properties }) => {
  const [removeId, setRemoveId] = useState('')
  const [removeProperty] = useMutation(removePropertyMutation)

  return (
    <div>
      <select onChange={e => setRemoveId(e.target.value)}>
        {properties &&
          properties.map(({ name, id }) => (
            <option key={name + id} value={id}>
              {name}
            </option>
          ))}
      </select>

      <button
        onClick={e => {
          e.preventDefault()
          removeProperty({
            variables: {
              id: removeId
            }
          })
          window.location.reload()
        }}
      >
        Remove property
      </button>
    </div>
  )
}

export default RemovePropertyForm
