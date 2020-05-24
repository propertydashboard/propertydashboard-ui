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
    <div
      className="modal fade"
      id="removeModal"
      data-backdrop="static"
      data-keyboard="false"
      role="dialog"
      aria-labelledby="removeModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">Remove a property</div>
          <div className="modal-body">
            <div className="form-group">
              <select
                onChange={e => setRemoveId(e.target.value)}
                className="form-control"
              >
                {properties &&
                  properties.map(({ name, id }) => (
                    <option key={name + id} value={id}>
                      {name}
                    </option>
                  ))}
              </select>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemovePropertyForm
