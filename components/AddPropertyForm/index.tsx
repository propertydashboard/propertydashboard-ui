import React, { useState, FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useUser } from '../../lib/hooks'
import Field from '../Field'

const addPropertyMutation = gql`
  mutation addPropertyMutation(
    $userId: String
    $name: String
    $price: Int
    $mortgage: Int
  ) {
    addProperty(
      input: {
        userId: $userId
        name: $name
        price: $price
        mortgage: $mortgage
      }
    ) {
      id
      userId
      name
      price
      mortgage
    }
  }
`

const AddPropertyForm: FunctionComponent = () => {
  const [newPropertyName, setNewPropertyName] = useState('')
  const [newPropertyPrice, setNewPropertyPrice] = useState('')
  const [newPropertyMortgage, setNewPropertyMortgage] = useState('')
  const [addProperty] = useMutation(addPropertyMutation)
  const user = useUser()

  return (
    <div
      className="modal fade"
      id="addModal"
      data-backdrop="static"
      data-keyboard="false"
      role="dialog"
      aria-labelledby="addModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">Add a property</div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              className="btn btn-info"
              onClick={e => {
                e.preventDefault()
                addProperty({
                  variables: {
                    userId: user.id,
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
        </div>
      </div>
    </div>
  )
}

export default AddPropertyForm
