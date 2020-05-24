import React, { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Layout from '../components/layout'

import PropertyList from '../components/PropertyList'
import AddPropertyForm from '../components/AddPropertyForm'
import RemovePropertyForm from '../components/RemovePropertyForm'

import { useUser } from '../lib/hooks'

function Dashboard() {
  const user = useUser()
  const loadDashboardQuery = gql`
  query loadDashboardQuery {
    getPortfolioValue(userId: "${String(user && user.id ? user.id : '')}")
    getEquity(userId: "${String(user && user.id ? user.id : '')}")
    getLTV(userId: "${String(user && user.id ? user.id : '')}")
    getProperties(userId: "${String(user && user.id ? user.id : '')}") {
      id
      name
      price
      image
    }
  }
`

  const {
    data: { getProperties, getPortfolioValue, getEquity, getLTV }
  } = useQuery(loadDashboardQuery)

  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }
  })

  return user ? (
    <Layout>
      <h1 className="h4 font-weight-light mt-5">Portfolio overview:</h1>
      <table className="table mb-5">
        <thead>
          <tr>
            <th scope="col">Portfolio Value</th>
            <th scope="col">Equity</th>
            <th scope="col">Portfolio LTV</th>
            <th scope="col">Number of properties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>£{getPortfolioValue}K</td>
            <td>£{getEquity}K</td>
            <td>{getLTV}%</td>
            <td>{getProperties && getProperties.length}</td>
          </tr>
        </tbody>
      </table>

      {getProperties && <PropertyList properties={getProperties} />}

      <button
        type="button"
        className="btn btn-outline-secondary btn-block"
        data-toggle="modal"
        data-target="#addModal"
      >
        Add a property
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary btn-block"
        data-toggle="modal"
        data-target="#removeModal"
      >
        Remove a property
      </button>
      <AddPropertyForm />
      <RemovePropertyForm properties={getProperties} />
      <p className="h6 font-weight-light mt-3 mb-3">
        Polygon Labs Limited 2020
      </p>
    </Layout>
  ) : null
}

export default withApollo(Dashboard)
