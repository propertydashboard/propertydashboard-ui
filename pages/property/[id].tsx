import React, { useState, FunctionComponent } from 'react'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { withApollo } from '../../apollo/client'
import Field from '../../components/Field'
import Layout from '../../components/layout'

const updatePropertyMutation = gql`
  mutation updatePropertyMutation(
    $id: String
    $name: String
    $price: Int
    $mortgage: Int
  ) {
    updateProperty(
      input: { id: $id, name: $name, price: $price, mortgage: $mortgage }
    ) {
      id
      name
      price
      mortgage
    }
  }
`

function Property() {
  const router = useRouter()

  const propertyQuery = gql`
    query propertyQuery {
      getProperty(id: "${String(
        router.query.id
      )}") { name, price, mortgage, image }
    }
  `
  const {
    loading,
    error,
    data: { getProperty }
  } = useQuery(propertyQuery)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const [newPropertyName, setNewPropertyName] = useState(getProperty.name)
  const [newPropertyPrice, setNewPropertyPrice] = useState(getProperty.price)
  const [newPropertyMortgage, setNewPropertyMortgage] = useState(
    getProperty.mortgage
  )
  const [updateProperty] = useMutation(updatePropertyMutation)

  return (
    <Layout>
      <h1 className="h4 font-weight-light mt-5">{getProperty.name}</h1>
      <img src={getProperty.image} alt="" className="w-50" />

      <table className="table mt-5 mb-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Current market value</th>
            <th scope="col">Outstanding mortgage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{getProperty.name}</td>
            <td>{getProperty.price}</td>
            <td>{getProperty.mortgage}</td>
          </tr>
        </tbody>
      </table>

      <button
        type="button"
        className="btn btn-outline-secondary btn-block"
        data-toggle="modal"
        data-target="#editModal"
      >
        Edit property
      </button>

      <div
        className="modal fade"
        id="editModal"
        data-backdrop="static"
        data-keyboard="false"
        role="dialog"
        aria-labelledby="editModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">Edit property</div>
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
                  updateProperty({
                    variables: {
                      id: router.query.id,
                      name: newPropertyName,
                      price: Number(newPropertyPrice),
                      mortgage: Number(newPropertyMortgage)
                    }
                  })
                  window.location.reload()
                }}
              >
                Update property
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withApollo(Property)
