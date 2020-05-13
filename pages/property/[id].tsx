import React, { useState, FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { withApollo } from '../../apollo/client'
import Field from '../../components/Field'

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
      getProperty(id: "${String(router.query.id)}") { name, price, mortgage }
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
    <>
      <h1>Property: {router.query.id}</h1>
      <p>{getProperty.name}</p>
      <p>{getProperty.price}</p>
      <p>{getProperty.mortgage}</p>

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
    </>
  )
}

export default withApollo(Property)
